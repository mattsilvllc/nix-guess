exports.user = function (req, res, next) {
  req.user ? next() : res.redirect('/');
};
