const socket = io("ws://localhost:3000");

socket.on('message', text => {
    const el = document.createElement('li');
    el.innerHTML = text;
})


document.addEventListener('keydown', logKey);

function logKey(e) {

  if (e.code == "ArrowUp"){
    socket.emit('message', e.code)
  }
  else if (e.code == "ArrowDown"){
    socket.emit('message', e.code)
  }
  else if (e.code == "Space"){
    socket.emit('message', e.code)
  }
}