const router = require('express').Router();
var passport = require('passport');
// don't forget to install passport-google-oauth
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../../api/users/user.model');


// Google authentication and login
router.get('/google', passport.authenticate('google', { scope: 'email' }));

router.get('/verify', function(req,res,next){
  console.log('YOU DID IT!!');
})

// handle the callback after Google has authenticated the user
router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/users', // or wherever
    failureRedirect: '/signup' // or wherever
  })
);


passport.use(
  new GoogleStrategy({
    clientID: '285737518633-btfi78f2l7ur8pq3nr4sjlcu6cnqcogi.apps.googleusercontent.com',
    clientSecret: '_IkMGgGjoCDZ3TR7XiKMP5K8',
    callbackURL: 'auth/verify'
  },
  // Google will send back the token and profile
  function (token, refreshToken, profile, done) {

    // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
    // console.log('info: ', profile)
    var info = {
      name: profile.displayName,
      email: profile.emails[0].value,
    };
    User.findOrCreate({
      where: {googleId: profile.id},
      defaults: info
    })
    .then(function ([user, boolCreated]) {
      done(null, user); //this invokes serializeUser as well as the successRedirect of the passport.authenticate that handles the response from the provider
    })
    .catch(done);
  })
);



module.exports = router;
