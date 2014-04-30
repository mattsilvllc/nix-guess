var fs = require('fs');
var auth_user = Helpers.auth.user;

fs.readdirSync(__dirname)
  .filter(function (name) {
    return name !== 'index.js';
  })
  .forEach(function (name) {
    require(__dirname + '/' + name);
  });

app.get('/', function (req, res) {
  res.locals.user = req.user;
  res.locals.authenticated = !!req.user;

  req.user ? res.redirect('/guess') : res.render('index');
});

