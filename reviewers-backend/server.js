const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('./config/passport');
const session = require('express-session');
const flash = require('connect-flash');
const SESSION_ID = require('./config/const').SESSION_ID;
const port = process.env.PORT || 3030;

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

app.use(express.static(path.join(__dirname, 'build'))); 

app.get('/*', function(req, res) { 
    res.sendFile(path.join(__dirname, 'build', 'index.html')); 
}); 


app.listen(port, () => {
  console.log(`Server running on ${port} port`);
});