const LocalStrategy = require('passport-local').Strategy;
const { User  } = require('../api/models/userModel');

module.exports = passport => {
  // console.log(app.use);

  passport.serializeUser((user, done) => {
    console.log('serializeUser')
    done(null, user.email);
  })

  passport.deserializeUser((email, done) => {
    console.log('deserializeUser')
    User.findById(email, (err, user) => {
      done(err, user);
    })
  })

  passport.use('join', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, email, password, done) => {
      console.log('[MY LOG]', email);
      User.findOne({email}, (err, user) => {
        // console.log(err, user);
        if(err) return done(error);
        if(user) {
          return done(null, false, req.flash('joinMessage', '이메일이 존재합니다.'));
        } else {
          const newUser = new User();
          newUser.email = email;
          newUser.username = req.body.username;
          newUser.password = newUser.generateHash(password);

          newUser.save(err => {
            if(err) throw err;
            return done(null, newUser);
          })
        }
      })
    }
  ));

  passport.use('login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, email, password, done) => {
      // console.log(req);
      User.findOne({email}, (err, user) => {
        if(err)
          return done(err);
        if(!user)
          return done(null, false, req.flash('loginMessage', '사용자를 찾을 수 없습니다.'));
        if(!user.validPassword(password)) 
          return done(null, false, req.flash('loginMessage', '비밀번호가 다릅니다.'));
        return done(null, user);
      })
    }  
  ))

}
