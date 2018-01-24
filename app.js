const express = require('express');
const http = require('http');
const bitCoin = require('./bitcoin');
const index = require('./routes/index');
const dashboard = require('./routes/dashboard');


const app = express();
const server = http.createServer(app);

const io = require('socket.io').listen(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/', index);
app.use('/dashboard', dashboard);

bitCoin(io);

io.on('connection', () => {
   console.log('Server Connected');
});

server.listen(3000);