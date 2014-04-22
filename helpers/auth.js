exports.user = function (req, res, next) {
  res.locals.user = req.user;
  res.locals.authenticated = !!req.user;
  req.user ? next() : res.redirect('/');
};
