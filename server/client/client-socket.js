const {
  MSG_SELF,
  MSG_BROADCAST,
  MSG_PLAYER,
  MSG_TYPE_DELIM,
  MSG_DATA_DELIM,
} = window.gamegame.CONSTANTS;

const PORT = 2000; // web socket port
const HOST = window.location.host;
const PING = 57;
const PONG = new Uint8Array(['A'.charCodeAt()]);

class ClientSocket {
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

  send = (message) => {
    if (this.socket && this.isConnected) {
      this.socket.send(message);
    }
  };

  onOpen = (event) => {
    console.log('-- on open');
    this.isConnected = true;
  };

  onError = (err) => {
    console.error(err);
    this.isConnected = false;
    this.socket = null;
  };

  onClose = (event) => {
    console.log('-- on close');
    this.isConnected = false;
    this.socket = null;
  };

  onMessage = (event) => {
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

  processSelfMessage = (messageArray) => {
    this.id = messageArray[0];
    document.getElementById('self-info').innerHTML = messageArray;
  };

  processBroadcastMessage = (messageArray) => {
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

    document.getElementById('broadcast-info').innerHTML = messageArray;
  };

  sendPlayerInfo = (player) => {
    const { x, y, pose, horizontalScale } = player;
    const socketMessage = `${MSG_PLAYER}${MSG_TYPE_DELIM}${x}__${y}__${pose}__${horizontalScale}__${this.id}`;
    this.send(socketMessage);

    // premature optimization !! might delete later
    // dont spam the server with results every frame
    // send at every 10 frames instead
    // const sendEveryNFrame = 1;
    // if (this.frameCounter === 0) {
    //   this.send(socketMessage);
    //   this.frameCounter++;
    // } else if (this.frameCounter === sendEveryNFrame) {
    //   this.frameCounter = 0;
    // } else {
    //   this.frameCounter++;
    // }
  };
}

export default ClientSocket;
