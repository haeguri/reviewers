module.exports = router => {
  const languages = require('./languageCtrl');

  router.route('/languages')
    .get(languages.all);
}