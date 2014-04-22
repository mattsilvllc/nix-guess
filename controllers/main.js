app.get('/', function (req, res) {
  res.render('index');
});

app.get('/results', function (req, res) {
  res.render('results');
});

app.get('/guess', function (req, res) {
  res.render('guess');
});
