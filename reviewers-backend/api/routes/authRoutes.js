const SESSSION_ID = require('../../config/const').SESSION_ID;

module.exports = app => {
  const passport = require('passport');

  app.post('/join', (req, res, next) => {
    passport.authenticate('join', (err, user, info) => {
      // console.log('join authenticate in router');
      if (err) { 
        return next(err);
      }

      if (!user) {
        return res.status(400).json({error: info});
      }

      return res.status(201).send(user);

    })(req, res, next);
  });

  app.post('/login', (req, res, next) => {
    console.log('login route handler')
    passport.authenticate("login", function(err, user, info){
      // console.log('login authenticate callback');
      if (err) { 
        return next(err);
      }

      if (!user) { 
        return res.status(400).json({error: info});
      }

      req.logIn(user, function(err) {
        if (err) { 
          return next(err);
        }
        return res.status(200).send(user);
      });
    })(req, res, next);
  });

  app.post('/logout', (req, res) => {
    if(req.isAuthenticated()) {
      req.logout();
      req.session.destroy();
      res.status(204).clearCookie(SESSSION_ID).send();
    } else {
      res.status(401).send({
        error: {
          message: 'Unauthorized request'
        }
      })
    }
  });
}