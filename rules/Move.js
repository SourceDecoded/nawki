// Move.js
// permits organizations to move around the environment

class Move {

  constructor(config) {
    config = config || {};
    var self = this;

    this.config = {
      "allow-overreach": true,
      "momentum": true,
      "friction": 2
    };

    Object.keys(this.config).forEach(function(key){
      if (config.hasOwnProperty(key)) {
        self.config[key] = config[key];
      }
    });

  }

  describe() {
    return {
      "overview":"Allows entities to move around in the world by applying force.",
      "reads":{
        "energy":{
          "type":"number",
          "description":"Entity's current energy level. Movement requires 1e per distance unit"
        },
        "move":{
          "type":"Array<number>",
          "description":"An array of numbers representing the coodinates in each dimension of the world."
        }
      },
      "mutates": {
        "energy":{
          "type":"number",
          "description":"Energy will be decremented according to distance traveled. If more distance was requested than energy available and allow-overreach = true, distance traveled will be as far as energy permits. If allow-overreach = false, no movement happens."
        },
        "position": {
          "type":"Array<number>",
          "description":"Entity's position in the world."
        },
        "last-position":{
          "type":"Array<number>",
          "description":"Entity's last position in the world."
        }
      }
    };
  }

  updateAsync(entity) {

  }

  entityAdded(entity) {

  }

}
