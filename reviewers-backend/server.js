const express = require('express'),
      expressApp = express(),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser');
      passport = require('passport'),
      passportConfig = require('./config/passport'),
      session = require('express-session'),
      flash = require('connect-flash'),
      port = process.env.PORT || 3030;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/reviewersDB');

passportConfig(passport);

expressApp.use(bodyParser.urlencoded({ extended: true}));
expressApp.use(bodyParser.json());
expressApp.use(passport.initialize());
expressApp.use(passport.session()); // 로그인 세션 유지..
expressApp.use(session({ 
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

expressApp.use(flash());

const routes = [];

routes.push(require('./api/routes/questionRoutes'));
routes.push(require('./api/routes/languageRoutes'));
routes.push(require('./api/routes/authRoutes'));
routes.forEach(route => route(expressApp));

expressApp.listen(port, () => {
  console.log('express server listen on '+port+' port');
});