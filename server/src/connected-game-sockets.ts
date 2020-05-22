import GameSocket from './game-socket';
import { formatBroadcastMessage } from './formatters';
import { WebSocketServer, WebSocket } from '@clusterws/cws';

class ConnectedGameSockets {
  idCounter: number;
  gameSockets: Array<GameSocket>;
  wsServer: WebSocketServer;

  constructor(wsServer: WebSocketServer) {
    this.idCounter = 1000;
    this.gameSockets = [];
    this.wsServer = wsServer;
  }

  connectSocket(socket: WebSocket) {
    const newGameSocket = new GameSocket(this, socket, this.idCounter++);
    this.gameSockets.push(newGameSocket);
    this.broadcastOnNewConnection();
  }

  // broadcast info for new player connection
  broadcastOnNewConnection() {
    this.broadcastAllGameSocketsInfo();
    this.broadcastAllPlayerNames();
    this.broadcastAllMessages();
  }

  broadcastAllGameSocketsInfo() {
    let broadcastMessage = '';
    this.gameSockets.forEach((gameSocket) => {
      broadcastMessage += gameSocket.getPlayerFormattedInfo();
    });

    // Allow to still split on "::" for child type messages. Looks like this
    // BROADCAST::PLAYER::x__y__pose__horiz__::PLAYER::player_data::PLAYER::player_data::
    this.wsServer.broadcast(formatBroadcastMessage(broadcastMessage));
  }

  broadcastAllPlayerNames() {
    let broadcastMessage = '';
    this.gameSockets.forEach((gameSocket) => {
      broadcastMessage += gameSocket.getPlayerNameFormatted();
    });

    // Broadcast each players name and its ID
    this.wsServer.broadcast(formatBroadcastMessage(broadcastMessage));
  }

  broadcastAllMessages() {
    let broadcastMessage = '';
    this.gameSockets.forEach((gameSocket) => {
      broadcastMessage += gameSocket.getPlayerChatMessagesFormatted();
    });
    this.wsServer.broadcast(formatBroadcastMessage(broadcastMessage));
  }

  removeGameSocketById(id: number) {
    const { gameSockets } = this;
    for (let i = 0; i < gameSockets.length; i++) {
      if (gameSockets[i].id === id) {
        gameSockets.splice(i, 1);
      }
    }

    // broadcast new info
    this.broadcastAllGameSocketsInfo();
  }
}

export default ConnectedGameSockets;
