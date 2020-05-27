#!/bin/bash

cd server
pm2 stop app
pm2 delete app
pm2 start dist/index.js --name app
