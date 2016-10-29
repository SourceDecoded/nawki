var Watcher = function(socket, canvas){
  var context = canvas.getContext("2d");
  socket.on("state", (data) => {
    context.fillStyle("rgb(255,255,255)");
    context.fillRect(0,0,canvas.width,canvas.height);
    data.entities.forEach((entity) => {
      var blue = Math.random() * 255;
      context.fillStyle("rgb(0,0,"+blue+")");
      context.beginPath();
      context.arc(entity.position.coords[0], entity.position.coords[1], 10, 0, Math.PI*2, true);
      context.closePath();
      context.fill();
    });
  });
};
