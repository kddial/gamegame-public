import { createServer } from 'http';
import { WebSocketServer } from '@clusterws/cws';
import ConnectedSockets from './connected-game-sockets';
import handler from 'serve-handler';
import path from 'path';

const PORT = 2000;
const http = createServer((req, res) => {
  // serve static html & image files
  return handler(req, res, {
    public: path.join(__dirname, '..', 'client'),
  });
});

const wsServer = new WebSocketServer({
  server: http,
});
wsServer.startAutoPing(10000, true); // check if clients are alive, every 10 sec

const connectedSocketsInstance = new ConnectedSockets(wsServer);

http.listen(PORT, () => {
  console.log(`running on  http://localhost:${PORT}`);
});

wsServer.on('connection', (socket, req) => {
  console.log('web socket connection init');
  connectedSocketsInstance.connectSocket(socket);
});
