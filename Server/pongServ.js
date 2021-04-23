const http = require("http").createServer();

var players = [];

const io = require("socket.io")(http, {

  cors: { origin: "*" },

});

io.on("connection", (socket) => {

  players.push(`${socket.id.substr(0, 2)}`);
  if(players.length == 1){
    console.log('player1');
    socket.emit('player', 'player1');
  }
  if(players.length == 2){
    console.log('player3');
    socket.emit('player', 'player3');
  }
  socket.on('majP1', (P1) => {
    io.emit('moveP1', P1);
  });
  socket.on('majP3', (P3) => {
    io.emit('moveP3', P3);
  });

  console.log("Un nouveau joueur s'est connecté");

  socket.on("message", (message) => {
    io.emit("message", `${socket.id.substr(0, 2)} à dit ${message}`);
  });

});


http.listen(3000, () => console.log("http://localhost:3000"));