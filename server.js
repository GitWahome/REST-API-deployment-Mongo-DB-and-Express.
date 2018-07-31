const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);
//console.log(process.env.MONGO_ATLAS_PORT);
console.log(process.env.MONGO_ATLAS_PW);
//console.log(process.env.MONGO_ATLAS_UN);
console.log('UP AND RUNNING');

