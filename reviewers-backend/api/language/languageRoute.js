module.exports = router => {
  const languages = require('./languageCtrl');

  router.route('/')
    .get(languages.all);
}