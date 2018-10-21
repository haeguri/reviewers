module.exports = app => {
  const languages = require('../controllers/languageController');

  app.route('/languages')
    .get(languages.all);
}