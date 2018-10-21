const express = require('express'),
  expressApp = express(),
  port = process.env.PORT || 3030,
  mongoose = require('mongoose'),
  // Question = require('./api/models/questionModel'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/reviewersDB');

expressApp.use(bodyParser.urlencoded({ extended: true}));
expressApp.use(bodyParser.json());

const questionRoutes = require('./api/routes/questionRoutes');
const languageRoutes = require('./api/routes/languageRoutes');

questionRoutes(expressApp);
languageRoutes(expressApp);

expressApp.listen(port, () => {
  console.log('express server listen on '+port+' port');
});