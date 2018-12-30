module.exports = router => {
  const questions = require('./questionCtrl');
  const reviews = require('../review/reviewCtrl');

  router.route('/')
    .get(questions.all)
    .post(questions.create);

  router.route('/:questionId')
    .get(questions.selectOne)
    .put(questions.update)
    .delete(questions.delete);
  
  router.route('/:questionId/reviews')
    .get(reviews.all)
    .post(reviews.create);

  router.route('/:questionId/reviews/:reviewId')
    .put(reviews.update)
    .delete(reviews.delete);
}