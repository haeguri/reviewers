const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser');
      passport = require('passport'),
      passportConfig = require('./config/passport'),
      session = require('express-session'),
      flash = require('connect-flash'),
      SESSION_ID = require('./config/const').SESSION_ID,
      port = process.env.PORT || 3030;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/reviewersDB');

passportConfig(passport);

console.log = (() => {
  const buildInLog = console.log;
  return (...args) => {
    buildInLog('[LOG]', ...args);
  }
})();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(session({ 
  key: SESSION_ID,
  secret: 'reviewers_session_secret',
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 1
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/api', require('./api/apiRoute'));

app.listen(port, () => {
  console.log(`Server running on ${port} port`);
});