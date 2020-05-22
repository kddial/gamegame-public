import {
  formatPlayerInfo,
  formatSelfInfo,
  formatPlayerName,
  formatPlayerChatMessages,
} from './formatters';
import { WebSocket } from '@clusterws/cws';
import ConnectedGameSockets from './connected-game-sockets';
import SOCKET_CONSTANTS from './socket-constants';
const {
  MSG_PLAYER,
  MSG_TYPE_DELIM,
  MSG_DATA_DELIM,
  MSG_SET_NAME,
  MSG_CHAT_MESSAGE,
} = SOCKET_CONSTANTS;

class GameSocket {
  connectedGameSockets: ConnectedGameSockets;
  socket: WebSocket;
  id: number;
  x: number;
  y: number;
  pose: string;
  horizontalScale: number;
  playerName: string;
  messages: Array<string>;

  constructor(
    connectedGameSockets: ConnectedGameSockets,
    serverSocket: WebSocket,
    id: number,
  ) {
    this.socket = serverSocket;
    this.id = id;
    this.connectedGameSockets = connectedGameSockets;
    this.playerName = '';
    this.messages = [];

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

  getPlayerNameFormatted = () => {
    return formatPlayerName(this.id, this.playerName);
  };

  getPlayerChatMessagesFormatted = () => {
    return formatPlayerChatMessages(this.id, this.messages);
  };

  onSocketClose = () => {
    this.connectedGameSockets.removeGameSocketById(this.id);
    // TODO: need to broadcast which player leaves, so the client side can clear
    // their memory of stale 'otherPlayersMessagesById' and 'otherPlayersNameById'
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
    } else if (messageType === MSG_SET_NAME) {
      this.playerName = messageData;

      // broadcast new name to all clients
      this.connectedGameSockets.broadcastAllPlayerNames();
    } else if (messageType === MSG_CHAT_MESSAGE) {
      const messages = messageData.split(MSG_DATA_DELIM);
      messages.shift(); // the first index is the socket id, ignore it.
      this.messages = messages;

      // broadcast new info to all clients
      this.connectedGameSockets.broadcastAllMessages();
    }
  };
}

export default GameSocket;
