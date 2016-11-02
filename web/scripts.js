var canvas = document.querySelector("#watcher-canvas");
var socket = io();
var watcher = new Watcher(socket, canvas);
