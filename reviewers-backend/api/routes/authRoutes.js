module.exports = app => {
  const passport = require('passport');


  app.post('/join', passport.authenticate('join', {
    failureFlash: true,
    successRedirect : '/profile', 
    failureRedirect: '/login'
  }));

  app.post('/login', passport.authenticate('login', {
    failureFlash: true,
    successRedirect : '/profile', 
    failureRedirect: '/login'
  }));
}