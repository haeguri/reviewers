module.exports = router => {
  const reviews = require('./reviewCtrl');

  router.route('/')
    .get(reviews.all)
    .post(reviews.create);

  router.route('/:reviewId')
    .put(reviews.update)
    .delete(reviews.delete);
}