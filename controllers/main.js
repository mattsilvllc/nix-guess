var auth_user = Helpers.auth.user;

app.get('/', function (req, res) {
  res.locals.user = req.user;
  res.locals.authenticated = !!req.user;
  
  res.render('index');
});

app.get('/results', auth_user, function (req, res) {
  res.render('results');
});

app.get('/guess', auth_user, function (req, res) {
  res.render('guess');
});
