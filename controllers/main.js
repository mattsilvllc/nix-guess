var auth_user = Helpers.auth.user;

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/results', auth_user, function (req, res) {
  res.render('results');
});

app.get('/guess', auth_user, function (req, res) {
  res.render('guess');
});
