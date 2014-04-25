var Route = express.Router();
var auth_user = Helpers.auth.user;
var Guess = Models.Guess;
var User = Models.User;
var redirect_error = Helpers.redirect_error

Route.get('/', auth_user, function (req, res) {
  Q.all([Guess.random(req.user), User.stats(req.user)])
  .spread(function (product, answers) {
    res.render('guess', {
      product: product,
      answers: answers
    });
  })
  .fail(function (error) {
    redirect_error(error, res);
  });
});

Route.post('/', auth_user, function (req, res) {
  var answer = parseInt(req.body.answer + '');
  var item = req.body.item;

  if (!answer) return redirect_error('answer should be Number', res);

  Guess.handle(item, answer, req.user)
  .then(function (result) {
    res.json(result);
  })
  .fail(function (error) {
    res.statusCode = 500;
    res.json({
      error: error
    })
  });

});

app.use('/guess', Route);
