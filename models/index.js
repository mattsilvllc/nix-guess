var fs     = require('fs');
var mysql  = require('mysql');
var Models = {};

global.DB = mysql.createConnection({
  host     : config.get('DB_HOST'),
  user     : config.get('DB_USER'),
  password : config.get('DB_PASS'),
  database : config.get('DB_NAME')
});

DB.connect();

fs.readdirSync(__dirname)
  .filter(function (name) {
    return name !== 'index.js';
  })
  .forEach(function (name) {
    var upper = name[0].toUpperCase() + name.slice(1, name.length - 3);
    Models[upper] = require(__dirname + '/' + name);
  });

module.exports = Models;
