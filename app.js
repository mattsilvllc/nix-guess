var path     = require('path');
var express  = require('express');
var parser   = require('body-parser');
var cookie   = require('cookie-parser');
var session  = require('express-session');
var passport = require('passport');
var morgan   = require('morgan');
var override = require('method-override');
var app      = express();

global.express = express;
global._ = require('lodash');
global.Q = require('q');
global.config = require('nconf').argv().env().file({ file: 'config.json' });
global.APP_PATH = __dirname;
global.app = app;
global.Helpers = require(APP_PATH + '/helpers');
global.Models = require(APP_PATH + '/models');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev')); 
app.use(override());
app.use(cookie());
app.use(parser());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
require(APP_PATH + '/controllers');


app.listen(config.get('PORT'), function () {
  console.log('rolling on port ' + config.get('PORT'));
});
