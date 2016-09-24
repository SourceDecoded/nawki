var Observer = require('./Observer');
// adapted from the BASE js library
var Observable = function () {
  var self = this;

  var observers = [];

  self.getObservers = function () {
      return observers;
  };

  self.observe = function () {
      var observer = new Observer(function () {
          var index = observers.indexOf(observer);
          if (index >= 0) {
              observers.splice(index, 1);
          }
      });
      observers.push(observer);
      return observer;
  };

  self.observeType = function (type, callback) {

      var observer = new Observer(function () {
          var index = observers.indexOf(observer);
          if (index >= 0) {
              observers.splice(index, 1);
          }
      });

      var modifiedObserver = observer.filter(function (event) {
          if (typeof event.type !== "undefined" && event.type === type) {
              return true;
          }
          return false;
      }).onEach(callback);

      observers.push(observer);
      return modifiedObserver;
  };

  self.notify = function (e) {
      observers.slice(0).forEach(function (observer) {
          observer.notify(e);
      });
  };
};

module.exports = Observable;
