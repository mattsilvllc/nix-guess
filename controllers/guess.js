var Route = express.Router();
var auth_user = Helpers.auth.user;
var Guess = Models.Guess;
var redirect_error = Helpers.redirect_error

Route.get('/', auth_user, function (req, res) {
  Guess.random(req.user)
  .then(function (product) {
    res.render('guess', {
      product: product
    });
  })
  .fail(function (error) {
    redirect_error(error, res);
  });
});

app.use('/guess', Route);
