exports.redirect_error = function (error, res) {
  res.render('error', {
    error: error
  });
};

exports.random_answers = function (product) {
  var correct = product.nf_calories;
  var answers = [correct];

  var i = Math.random();
  answers[1] = i > 0.5 ? correct * (1 + 0.2) : correct * (1 - 0.2);
  answers[1] = Math.round(answers[1]);
  
  i = Math.random();
  answers[2] = i > 0.5 ? correct * (1 + 0.35) : correct * (1 - 0.35);
  answers[2] = Math.round(answers[2]);
  
  i = Math.random();
  answers[3] = i > 0.5 ? correct * (1 + 0.5) : correct * (1 - 0.5);
  answers[3] = Math.round(answers[3]);

  product.answers = exports.shuffle(answers);
  return product;
};


exports.shuffle = function (o) {
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};
