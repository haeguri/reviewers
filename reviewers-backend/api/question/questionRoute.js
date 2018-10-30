module.exports = router => {
  const questions = require('./questionCtrl');

  router.route('/')
    .get(questions.all)
    .post(questions.create);

  router.route('/:questionId')
    .get(questions.selectOne)
    .put(questions.update)
    .delete(questions.delete);
}