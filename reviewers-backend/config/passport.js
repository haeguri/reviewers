const LocalStrategy = require('passport-local').Strategy;
const { User  } = require('../api/auth/authModel');

module.exports = passport => {
  // # serializerUser ( 세션에 저장할 떄 )
  // Verify Callback에서 인증성공 시 호출되는 done(null, user)에서
  // user 객체를 전달받아 세션(req.session.passport.user)에 저장
  passport.serializeUser((user, done) => {
    // console.log('serializerUser');
    done(null, user._id);
  });

  // # deserializeUser ( 세션에서 가져올 때 )
  passport.deserializeUser((id, done) => {
    // console.log('deserializeUser');
    User.findById(id, (err, user) => {
      done(null, user);
    })
  });

  passport.use('join', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
      session: true
    },
    function verifyCallback(req, email, password, done) {
      // console.log('join verify callback');
      User.findOne({email}, (err, user) => {
        // 1. DB 조회 등 서버 측 에러
        if(err) {
          return done(error)
        };

        // 2. 인증 에러
        if(user) {
          /**
           * done의 인자?
           * 1: 서버 측 에러 
           * 2: 인증 실패 시 false를, 인증 성공 시 user 객체 반환
           * 3: 사용자 정의 에러
           */
          return done(null, false, {  message: 'User already exists' });
        } else {
          const newUser = new User(); 
          newUser.email = email;
          newUser.username = req.body.username;
          newUser.password = newUser.generateHash(password);

          newUser.save(err => {
            if(err) {
              throw err;
            };

            return done(null, newUser);
          })
        }
      })
    }
  ));

  passport.use('login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
      session: true
    },
    function verifyCallback(req, email, password, done) {
      // console.log('login verify callback');
      User.findOne({email}, (err, user) => {
        // 1. DB 조회 등 서버 측 에러 처리
        if (err) {
          return done(err);
        }

        // 2. 인증 에러 처리
        if (!user) {
          return done(null, false, { message: 'No users found' });
        }

        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Password is incorrect' });
        }

        return done(null, user);
      });
    }
  ));
}
