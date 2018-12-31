'use strict';

const { Review } = require('./reviewModel');
const { Question } = require('../question/questionModel');

module.exports = {
  all: async ({ params: { questionId } }, res) => {
    try {
      const question = 
        await Question.findById(questionId)
          .populate({
            path: 'reviews.author',
            model: 'User',
            select: '-password -email -joined',
          });

      res.json({
        data: question.reviews.sort((r1, r2) => {
          return r2.created.getTime() - r1.created.getTime();
        })
      })

    } catch (err) {
      res.send(err);
    }
  },
  create: async ({ params: { questionId }, body }, res) => {
    try {
      const question = await Question.findById(questionId);
      const newReviewData = {
        ...body,
        question: questionId
      };
      const newReview = new Review(newReviewData);

      question.reviews.push(newReview)
      await question.save();

      res.json({data: newReview});
    } catch (err) {
      res.send(err);
    }
  },
  update: async ({ params: { questionId, reviewId }, body }, res) => {
    try {
      const question = await Question.findById(questionId);
      const review = question.reviews.find(r => r.id === reviewId);
      
      review.title = body.title;
      review.body = body.body;

      await question.save();
      res.json({
        data: review
      })
    } catch (err) {
      res.send(err);
    }
  },
  delete: async ({ params: { questionId, reviewId } }, res) => {
    try {
      const question = await Question.findById(questionId);
      const targetIndex = question.reviews.findIndex(r => r.id === reviewId);

      question.reviews.splice(targetIndex, 1);

      await question.save();

      res.json({
        message: 'Review successfully deleted'
      })
    } catch (err) {
      res.send(err);
    }
  }
};