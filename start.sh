#!/bin/bash
#nginx -g "daemon off;"
nginx
cd server
mkdir test
chmod +x test
npm i
#screen -S node_server -dm npx nodemon server.js
node server.js