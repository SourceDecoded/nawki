// Nawki.js
// The main nawki server
var Nawki = function(){
  var self = this;
  var socketProvider = null;

  self.setSocketProvider = function(value) {
    // might eventually be cool to switch out the socket provider, but
    // we'll stay safe for now
    if (!socketProvider) {
      socketProvider = value;
    }
  };

  

};

module.exports = function(socketProvider){
  var nawki = new Nawki();
  nawki.setSocketProvider(socketProvider);
  return nawki;
};
