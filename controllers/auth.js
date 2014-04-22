var passport = require('passport')
var Fb_strategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new Fb_strategy({
    clientID: config.get('FACEBOOK_APP_ID'),
    clientSecret: config.get('FACEBOOK_APP_SECRET'),
    callbackURL: config.get('APP_URL') + '/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/guess',
  failureRedirect: '/?error=true'
}));
