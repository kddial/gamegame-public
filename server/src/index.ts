import https from 'https';
import { WebSocketServer } from '@clusterws/cws';
import ConnectedSockets from './connected-game-sockets';
import handler from 'serve-handler';
import path from 'path';
import fs from 'fs';
import os from 'os';

const PORT = 2000;

const options = {
  cert: fs.readFileSync(os.homedir() + '/.gamegame/https.cert'),
  key: fs.readFileSync(os.homedir() + '/.gamegame/https.key'),
};

const server = https.createServer(options, (req, res) => {
  // serve static html & image files
  return handler(req, res, {
    public: path.join(__dirname, '..', '..', 'client'),
    directoryListing: false,
  });
});

const wsServer = new WebSocketServer({
  server: server,
});
wsServer.startAutoPing(10000, true); // check if clients are alive, every 10 sec

const connectedSocketsInstance = new ConnectedSockets(wsServer);

server.listen(PORT, () => {
  console.log(`running on  https://localhost:${PORT}`);
});

wsServer.on('connection', (socket, req) => {
  console.log('web socket connection init');
  connectedSocketsInstance.connectSocket(socket);
});
