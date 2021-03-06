// Move.js
// permits organizations to move around the environment

class Move {

  self.config = {
    "allow-overreach": true,
    "momentum": true,
    "friction": 2
  };

  constructor(config) {
    Object.keys.forEach(function(key){
      if (config.hasOwnProperty(key)) {
        self.config[key] = config[key];
      }
    });
  }

  describe() {
    return {
      "overview":"Allows entities to move around in the world.",
      "reads":{
        "energy":{
          "type":"number",
          "description":"Entity's current energy level. Movement requires 1e per distance unit"
        },
        "move-X":{
          "type":"number",
          "description":"Number of horizontal distance units the entity wants to travel.  right > 0 > left"
        },
        "move-Y":{
          "type":"number",
          "description":"Number of distance units the entity wants to travel. up > 0 > down"
        }
      },
      "mutates": {
        "energy":{
          "type":"number",
          "description":"Energy will be decremented according to distance traveled. If more distance was requested than energy available and allow-overreach = true, distance traveled will be as far as energy permits. If allow-overreach = false, no movement happens."
        },
        "pos-X": {
          "type":"number",
          "description":"Entity's new X position in the world."
        },
        "pos-Y":{
          "type":"number",
          "description":"Entity's new Y position in the world."
        }
      },
      "adds": {
        "pos-X-from": {
          "type":"number",
          "description":"Entity's X position before moving"
        },
        "pos-Y-from": {
          "type":"number",
          "description":"Entity's Y position before moving"
        }
      }
    };
  }

  updateAsync(entity) {

  }

  entityAdded(entity) {

  }

  entity


}
