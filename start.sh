#!/bin/bash
#nginx -g "daemon off;"
nginx
cd server
mkdir data
chmod +x data
npm i
#screen -S node_server -dm npx nodemon server.js
node server.js