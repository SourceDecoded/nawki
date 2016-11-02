var Watcher = function(socket, canvas){
  var context = canvas.getContext("2d");
  var worldWidth = 0;
  var worldHeight = 0;
  var worldXOffset = 0;
  var worldYOffset = 0;

  socket.on("state", (data) => {
    if (data) {
      context.fillStyle = "rgb(255,255,255)";
      context.fillRect(0,0,canvas.width,canvas.height);
      data.entities.forEach((entity) => {
        context.fillStyle = "rgb(0,0,156)";
        context.beginPath();
        var scaledPositionX = ((entity.position.coords[0] / worldWidth)  * canvas.width) + worldXOffset;
        var scaledPositionY = ((entity.position.coords[1] / worldHeight) * canvas.height) + worldYOffset;
        context.arc(scaledPositionX, scaledPositionY, 10, 0, Math.PI*2, true);
        context.fill();
        context.closePath();
      });
    }
  });

  socket.on("describe", (data) => {
    console.log("Description recieved");
    data = JSON.parse(data);
    // the size of the world should be found here:
    var worldConfig = data.filter((config) => { return config.name === "FiniteWorld";})[0];
    var worldXMin = worldConfig.config.size[0].min;
    var worldXMax = worldConfig.config.size[0].max;
    var worldYMin = worldConfig.config.size[1].min;
    var worldYMax = worldConfig.config.size[1].max;
    worldWidth = worldXMax - worldXMin;
    worldHeight = worldYMax - worldYMin;
    worldXOffset = -1 * worldXMin;
    worldYOffset = -1 * worldYMin;
    socket.emit("watch");
  });

  socket.emit("describe");
};
