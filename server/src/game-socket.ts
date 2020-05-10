import { formatPlayerInfo, formatSelfInfo } from './formatters';
import { WebSocket } from '@clusterws/cws';
import ConnectedGameSockets from './connected-game-sockets';
import {
  MSG_PLAYER,
  MSG_TYPE_DELIM,
  MSG_DATA_DELIM,
} from './socket-constants.js';

class GameSocket {
  connectedGameSockets: ConnectedGameSockets;
  socket: WebSocket;
  id: number;
  x: number;
  y: number;
  pose: string;
  horizontalScale: number;

  constructor(
    connectedGameSockets: ConnectedGameSockets,
    serverSocket: WebSocket,
    id: number,
  ) {
    this.socket = serverSocket;
    this.id = id;
    this.connectedGameSockets = connectedGameSockets;

    this.socket.on('close', this.onSocketClose);
    this.socket.on('message', this.onSocketMessage);
    this.sendSelfFormattedInfo();
  }

  sendSelfFormattedInfo = () => {
    const selfFormattedInfo = formatSelfInfo(this.id);
    this.socket.send(selfFormattedInfo);
  };

  getPlayerFormattedInfo = () => {
    if (
      this.x === undefined ||
      this.y === undefined ||
      this.pose === undefined ||
      this.horizontalScale === undefined
    ) {
      return '';
    }

    return formatPlayerInfo(
      this.x,
      this.y,
      this.pose,
      this.horizontalScale,
      this.id,
    );
  };

  onSocketClose = () => {
    this.connectedGameSockets.removeGameSocketById(this.id);
  };

  onSocketMessage = (message: string) => {
    const [messageType, messageData] = message.split(MSG_TYPE_DELIM);

    if (messageType === MSG_PLAYER) {
      const [x, y, pose, horizontalScale, id] = messageData.split(
        MSG_DATA_DELIM,
      );
      this.x = parseInt(x);
      this.y = parseInt(y);
      this.pose = pose;
      this.horizontalScale = parseInt(horizontalScale);

      // broadcast new info to all clients
      this.connectedGameSockets.broadcastAllGameSocketsInfo();
    }
  };
}

export default GameSocket;
