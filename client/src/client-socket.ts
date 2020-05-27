import CONSTANTS from './constants.js';
const {
  MSG_SELF,
  MSG_BROADCAST,
  MSG_PLAYER,
  MSG_TYPE_DELIM,
  MSG_DATA_DELIM,
  SHOW_SOCKET_INFO,
  MSG_SET_NAME,
  MSG_PLAYER_NAME,
  MSG_CHAT_MESSAGE,
} = CONSTANTS;
import Player from './player.js';

const HOST = window.location.host;
const PING = 57;
const PONG = new Uint8Array(['A'.charCodeAt(0)]);

class ClientSocket {
  socket: WebSocket;
  isConnected: boolean;
  frameCounter: number;
  id: string;
  otherPlayersInfo: Array<OtherPlayerInfo>; // hold other players movements
  otherPlayersNameById: { [key: string]: string };
  otherPlayersMessagesById: { [key: string]: Array<string> };
  sendQueue: Array<string | Uint8Array>;

  constructor() {
    this.socket = new WebSocket(`wss://${HOST}`);
    this.socket.binaryType = 'arraybuffer';

    this.socket.onopen = this.onOpen;
    this.socket.onerror = this.onError;
    this.socket.onclose = this.onClose;
    this.socket.onmessage = this.onMessage;
    this.isConnected = false;
    this.frameCounter = 0;
    this.id;
    this.otherPlayersInfo = [];
    this.otherPlayersNameById = {};
    this.otherPlayersMessagesById = {};
    this.sendQueue = []; // messages to send once socket is connected
  }

  send = (message: string | Uint8Array) => {
    if (this.socket && this.isConnected) {
      this.socket.send(message);
    } else {
      console.log(
        'Message is added to queue to send on socket connection:',
        message,
      );
      this.sendQueue.push(message);
    }
  };

  onOpen = () => {
    console.log('-- on open');
    this.isConnected = true;

    this.sendQueue.forEach((message) => {
      this.send(message);
    });
  };

  onError = (err: any) => {
    console.error(err);
    this.isConnected = false;
    this.socket = null;
  };

  onClose = () => {
    console.log('-- on close');
    this.isConnected = false;
    this.socket = null;
  };

  onMessage = (event: any) => {
    const data = event.data;

    // server has ping me(client), i must pong back to server.
    if (typeof data !== 'string') {
      // transform to UInt8Array
      let buffer = new Uint8Array(data);

      if (buffer.length === 1 && buffer[0] === PING) {
        this.send(PONG);
        return;
      }
    }

    const [messageType, ...restData] = data.split(MSG_TYPE_DELIM);
    if (messageType === MSG_SELF) {
      this.processSelfMessage(restData);
      return;
    } else if (messageType === MSG_BROADCAST) {
      this.processBroadcastMessage(restData);
      return;
    }
  };

  processSelfMessage = (messageArray: Array<string>) => {
    this.id = messageArray[0];
    if (SHOW_SOCKET_INFO) {
      document.getElementById('self-info').innerHTML = messageArray.toString();
    }
  };

  processBroadcastMessage = (messageArray: Array<string>) => {
    let broadcastType = '';

    // get list of other players info
    // messageArray e.g. ['MSG_PLAYER', 'x__y__pose__scale', 'MSG_PLAYER', 'x__y__pose__scale', ...]
    const newOtherPlayersInfo = [];

    let i = 0;
    while (i < messageArray.length) {
      if (messageArray[i] === MSG_PLAYER) {
        broadcastType = MSG_PLAYER;
        i++;
        const [x, y, pose, horizontalScale, id, name] = messageArray[i].split(
          MSG_DATA_DELIM,
        );

        if (id !== this.id) {
          newOtherPlayersInfo.push({
            x: parseInt(x),
            y: parseInt(y),
            pose,
            horizontalScale: parseInt(horizontalScale),
            id,
          });
        }
      } else if (messageArray[i] === MSG_PLAYER_NAME) {
        broadcastType = MSG_PLAYER_NAME;
        i++;
        const [playerId, playerName] = messageArray[i].split(MSG_DATA_DELIM);
        this.otherPlayersNameById[playerId] = playerName;
      } else if (messageArray[i] === MSG_CHAT_MESSAGE) {
        broadcastType = MSG_CHAT_MESSAGE;
        i++;
        const messages = messageArray[i].split(MSG_DATA_DELIM);
        const playerId = messages.shift();

        if (playerId !== this.id) {
          this.otherPlayersMessagesById[playerId] = messages;
        }
      }

      i++;
    }

    if (broadcastType === MSG_PLAYER) {
      this.otherPlayersInfo = newOtherPlayersInfo;
    }

    if (SHOW_SOCKET_INFO) {
      document.getElementById(
        'broadcast-info',
      ).innerHTML = messageArray.toString();
    }
  };

  stepFrameCounter = () => {
    this.frameCounter++;
    if (this.frameCounter === 60) {
      this.frameCounter = 0;
    }
  };

  sendPlayerInfo = (player: Player) => {
    // NOTE: sendEveryNFrame is used to throttle websocket sends, so I can debug the messages in the chrome network tab
    const sendEveryNFrame = 1; // should be value 1.
    const { x, y, pose, horizontalScale } = player;
    const socketMessage = `${MSG_PLAYER}${MSG_TYPE_DELIM}${x}__${y}__${pose}__${horizontalScale}__${this.id}`;

    if (sendEveryNFrame > 1) {
      // throttle sending messages
      if (Number.isInteger(this.frameCounter / sendEveryNFrame)) {
        this.send(socketMessage);
      }
    } else {
      // send messages on every step
      this.send(socketMessage);
    }
  };

  sendPlayerName = (name: string) => {
    const socketMessage = `${MSG_SET_NAME}${MSG_TYPE_DELIM}${name}`;
    this.send(socketMessage);
  };

  // send chat messages
  sendMessages = (messages: Array<[number, string]>) => {
    const concatMessages = messages.map((msg) => msg[1]).join('__');
    const socketMessage = `${MSG_CHAT_MESSAGE}${MSG_TYPE_DELIM}${this.id}__${concatMessages}`;
    this.send(socketMessage);
  };
}

export default ClientSocket;
