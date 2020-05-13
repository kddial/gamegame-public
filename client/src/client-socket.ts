import CONSTANTS from './constants.js';
const {
  MSG_SELF,
  MSG_BROADCAST,
  MSG_PLAYER,
  MSG_TYPE_DELIM,
  MSG_DATA_DELIM,
  SHOW_SOCKET_INFO,
} = CONSTANTS;
import Player from './player';

const HOST = window.location.host;
const PING = 57;
const PONG = new Uint8Array(['A'.charCodeAt(0)]);

class ClientSocket {
  socket: WebSocket;
  isConnected: boolean;
  frameCounter: number;
  id: string;
  otherPlayersInfo: Array<OtherPlayerInfo>;

  constructor() {
    this.socket = new WebSocket(`ws://${HOST}`);
    this.socket.binaryType = 'arraybuffer';

    this.socket.onopen = this.onOpen;
    this.socket.onerror = this.onError;
    this.socket.onclose = this.onClose;
    this.socket.onmessage = this.onMessage;
    this.isConnected = false;
    this.frameCounter = 0;
    this.id;
    this.otherPlayersInfo = [];
  }

  send = (message: string | Uint8Array) => {
    if (this.socket && this.isConnected) {
      this.socket.send(message);
    }
  };

  onOpen = () => {
    console.log('-- on open');
    this.isConnected = true;
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
    // get list of other players info
    // messageArray e.g. ['MSG_PLAYER', 'x__y__pose__scale', 'MSG_PLAYER', 'x__y__pose__scale', ...]
    const otherPlayersInfo = [];

    let i = 0;
    while (i < messageArray.length) {
      if (messageArray[i] === MSG_PLAYER) {
        i++;
        const [x, y, pose, horizontalScale, id] = messageArray[i].split(
          MSG_DATA_DELIM,
        );

        if (id !== this.id) {
          otherPlayersInfo.push({
            x: parseInt(x),
            y: parseInt(y),
            pose,
            horizontalScale: parseInt(horizontalScale),
            id,
          });
        }
      }
      i++;
    }
    this.otherPlayersInfo = otherPlayersInfo;

    if (SHOW_SOCKET_INFO) {
      document.getElementById(
        'broadcast-info',
      ).innerHTML = messageArray.toString();
    }
  };

  sendPlayerInfo = (player: Player) => {
    const { x, y, pose, horizontalScale } = player;
    const socketMessage = `${MSG_PLAYER}${MSG_TYPE_DELIM}${x}__${y}__${pose}__${horizontalScale}__${this.id}`;
    this.send(socketMessage);
  };
}

export default ClientSocket;
