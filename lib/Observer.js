// adapted from the BASE js library

var emptyFn = function(){};
var returnTrue = function(){return true;};
var returnItem = function(item){return item;};

var Observer = function (unbind, filter, map) {
  var self = this;

  self._onEach = emptyFn;
  self._onError = emptyFn;
  self._observers = [];

  self._unbind = unbind || emptyFn;

  self._filter = filter || returnTrue;

  self._map = map || returnItem;

  if (typeof self._filter !== "function") {
      throw new TypeError("Expected a function.");
  }

  if (typeof self._map !== "function") {
      throw new TypeError("Expected a function.");
  }

  var dispose = function () {
      self._unbind();
      self._state = disposedState;
  };

  var defaultState = {
      stop: function () {
          self._state = stoppedState;
      },
      start: emptyFn,
      notify: function (e) {

          if (self._filter(e)) {

              var value = self._map(e);

              self._onEach(value);

              self._observers.slice(0).forEach(function (observer) {
                  observer.notify(value);
              });
          }

      },
      dispose: dispose
  };

  var disposedState = {
      stop: emptyFn,
      start: emptyFn,
      notify: emptyFn,
      dispose: emptyFn
  };

  var stoppedState = {
      stop: emptyFn,
      start: function () {
          self._state = defaultState;
      },
      notify: emptyFn,
      dispose: emptyFn
  };

  self._state = defaultState;

};

Observer.prototype.notify = function (e) {
  this._state.notify(e);
};

Observer.prototype.copy = function () {
  return this.filter(function () { return true; });
};

Observer.prototype.stop = function () {
  this._state.stop();
};

Observer.prototype.start = function () {
  this._state.start();
};

Observer.prototype.dispose = function () {
  this._state.dispose();
};

Observer.prototype.filter = function (filter) {
  var self = this;

  if (typeof filter !== "function") {
      throw new Error("Filter needs to be a function.");
  }

  var observer = new Observer(function () {
      var index = self._observers.indexOf(observer);
      if (index >= 0) {
          self._observers.splice(index, 1);
      }

  }, filter);

  self._observers.push(observer);

  return observer;
};

Observer.prototype.map = function (map) {
  var self = this;

  var observer = new Observer(function () {
      var index = self._observers.indexOf(observer);
      if (index >= 0) {
          self._observers.splice(index, 1);
      }

  }, undefined, map);
  self._observers.push(observer);


  return observer;
};

Observer.prototype.onEach = function (callback) {
  var self = this;
  if (typeof callback !== "function") {
      throw new Error("Expected a function.");
  }

  self._onEach = callback;
  return self;
};

Observer.prototype.onError = function (callback) {
  var self = this;
  self._onError = callback;
  return self;
};

module.exports = Observer;
