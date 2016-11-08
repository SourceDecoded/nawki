var Watcher = function(socket, canvas){
  var context = canvas.getContext("2d");
  var worldWidth = 0;
  var worldHeight = 0;
  var worldXOffsetPercentage = 0;
  var worldYOffsetPercentage = 0;
  var colors = {};

  var getColor = function(eid){
    var color = colors[eid];
    if (!color) {
      var a = [];
      for (var i = 0; i < 3; i++) {
        a[i] = Math.floor(Math.random()*255);
      }
      a.push(0.8);
      color = "rgba("+ a.join(',') +")";
      colors[eid] = color;
    }
    return color;
  };

  socket.on("state", (data) => {
    if (data) {
      context.fillStyle = "rgb(255,255,255)";
      context.fillRect(0,0,canvas.width,canvas.height);
      data.entities.forEach((entity) => {
        context.fillStyle = getColor(entity.meta.id);
        context.beginPath();
        var scaledPositionX = ((entity.position.coords[0] / worldWidth)  * canvas.width) + worldXOffsetPercentage * canvas.width;
        var scaledPositionY = ((entity.position.coords[1] / worldHeight) * canvas.height) + worldYOffsetPercentage * canvas.height;
        context.arc(scaledPositionX, scaledPositionY, (entity.life.energy / 2), 0, Math.PI*2, true);
        context.fill();
        context.closePath();
      });
    }
  });

  socket.on("describe", (data) => {
    console.log("Description recieved");
    // the size of the world should be found here:
    var worldConfig = data.filter((config) => { return config.name === "FiniteWorld";})[0];
    var worldXMin = worldConfig.config.size[0].min;
    var worldXMax = worldConfig.config.size[0].max;
    var worldYMin = worldConfig.config.size[1].min;
    var worldYMax = worldConfig.config.size[1].max;
    worldWidth = worldXMax - worldXMin;
    worldHeight = worldYMax - worldYMin;
    worldXOffsetPercentage =  (-1 * worldXMin) / worldWidth;
    worldYOffsetPercentage = (-1 * worldYMin) / worldHeight;
    socket.emit("watch");
  });

  socket.emit("describe");
};
