var passport = require('passport')
var fb_strategy = require('passport-facebook').Strategy;
var local_strategy = require('passport-local').Strategy;
var User = Models.User;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.find_by_id(id)
    .then(function (user) {
      done(null, user);
    })
    .fail(done);
});

passport.use(new fb_strategy({
    clientID: config.get('FACEBOOK_APP_ID'),
    clientSecret: config.get('FACEBOOK_APP_SECRET'),
    callbackURL: config.get('APP_URL') + '/auth/facebook/callback'
  },
  function(access_token, refresh_token, profile, done) {
    profile = profile._json;
    var user = {
      fb_id: profile.id,
      fb_token: access_token,
      email: profile.email,
      first_name: profile.first_name,
      last_name: profile.last_name,
      gender: profile.gender,
      birthday: new Date(profile.birthday),
      last_login: new Date(),
      is_guest: false
    };

    User.find_by_fb_id(user.fb_id)
      .then(function (exists) {
        var data = [user.fb_token, new Date()];
        var promise = exists ? User.update(exists.id, data) : User.create(user);
        return promise;
      })
      .then(function (new_user) {
        done(null, new_user);
      })
      .fail(done)
  }
));

passport.use(new local_strategy(
  function(username, password, done) {
    var user = {
      is_guest: true,
      last_login: new Date()
    };

    User.create(user).then(function (new_user) {
      done(null, new_user);
    }).fail(done);
}));


app.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['email', 'user_birthday']
}));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/guess',
  failureRedirect: '/?error=true'
}));

app.get('/auth/guest', passport.authenticate('local', {
  successRedirect: '/guess',
  failureRedirect: '/?error=true'
}));
