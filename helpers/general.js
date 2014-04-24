exports.redirect_error = function (error, res) {
  res.render('error', {
    error: error
  });
};
