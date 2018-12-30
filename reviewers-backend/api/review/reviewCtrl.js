'use strict';

const { Review } = require('./reviewModel');
const { Question } = require('../question/questionModel');

module.exports = {
  all: (req, res) => {
    Review.find({}, (err, review) => {
      if(err)
        res.send(err);
      res.json(review);
    });  
  },
  create: async ({ params: { questionId }, body }, res) => {
    try {
      const question = await Question.findById(questionId);
      const newData = {
        ...body,
        question: questionId
      };
      const newReview = new Review(newData);

      question.reviews.push(newReview)
      await question.save();

      res.json({data: newReview});
    } catch (err) {
      res.send(err);
    }
  },
  update: (req, res) => {
    Review.findOneAndUpdate(
      {_id: req.params.reviewId},
      req.body,
      {new: true},
      (err, review) => {
        if(err)
          res.send(err);
        res.json(review)
      }
    );
  },
  delete: (req, res) => {
    Review.remove(
      {_id: req.params.reviewId},
      (err, review) => {
        if(err)
          res.send(err);
        res.json({message: 'Review successfully deleted'})
      }
    );
  }
};