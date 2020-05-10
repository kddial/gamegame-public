# dev and build

To run locally

```
cd server
yarn install
yarn start

go to http://localhost:2000
```

To build for deployment

```
cd server
yarn build

cd dist
node index.js
```

# project

I want Gamegame to be an online virtual hangout joint, for casual chit chat. Allow you to talk to people based on spatial distance (2d in this case).

Backend is a nodejs server which holds websocket connections with each client (browser). backend is in typescript.
In directory `/server/src`.

Front end is html canvas that renders the player and handles the physics and collisions. frontend is in vanilla js.
In directory `/server/client` which is served as static files from the server.

# credits

Player sprite is from https://rvros.itch.io/animated-pixel-hero
