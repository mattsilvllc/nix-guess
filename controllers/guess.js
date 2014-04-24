var Route = express.Router();
var auth_user = Helpers.auth.user;
var Guess = Models.Guess;
var redirect_error = Helpers.redirect_error

Route.get('/', auth_user, function (req, res) {
  Guess.random(req.user)
  .then(function (product) {
    res.render('guess', {
      product: product,
      answers: { correct: 15, all: 35 }
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
  .then(function (correct) {
    res.json({
      correct: correct
    });
  })
  .fail(function (error) {
    res.statusCode = 500;
    res.json({
      error: error
    })
  });

});

app.use('/guess', Route);
