var Route = express.Router();
var auth_user = Helpers.auth.user;
var User = Models.User;

Route.get('/', auth_user, function (req, res) {
  Q.all([User.results(req.user), User.stats(req.user)])
  .spread(function (results, stats) {
    res.render('results', {
      results: results,
      stats: stats
    });
  })
  .fail(function (error) {
    redirect_error(error, res);
  });
  
});

app.use('/results', Route);
