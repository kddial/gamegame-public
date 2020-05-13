#!/bin/bash

git pull
./gitlog.sh
cd server
yarn build
pm2 stop app
pm2 delete app
pm2 start dist/index.js --name app