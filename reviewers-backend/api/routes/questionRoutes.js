module.exports = app => {
  const questions = require('../controllers/questionController');

  app.route('/questions')
    .get(questions.all)
    .post(questions.create);
  
  app.route('/questions/:questionId')
    .get(questions.selectOne)
    .put(questions.update)
    .delete(questions.delete); 
}