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

app.all('/', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

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

const apiRouter = express.Router();
const apiRoutes = [];
apiRoutes.push(require('./api/routes/questionRoutes'));
apiRoutes.push(require('./api/routes/languageRoutes'));
apiRoutes.push(require('./api/routes/authRoutes'));
apiRoutes.forEach(route => route(apiRouter));

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Server running on ${port} port`);
});