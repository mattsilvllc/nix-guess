var fs = require('fs'),
    Models = {};

fs.readdirSync(__dirname)
  .filter(function (name) {
    return name !== 'index.js';
  })
  .forEach(function (name) {
    var upper = name[0].toUpperCase() + name.slice(1, name.length - 3);
    Models[upper] = require(__dirname + '/' + name);
  });

module.exports = Models;
