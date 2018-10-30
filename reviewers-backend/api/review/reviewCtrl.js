'use strict';

const { Review } = require('./reviewModel');

module.exports = {
  all: (req, res) => {
    Review.find({}, (err, review) => {
      if(err)
        res.send(err);
      res.json(review);
    });  
  },
  create: (req, res) => {
    const newReview = new Review(req.body);
    newReview.save((err, review) => {
      if(err)
        res.send(err);
      res.json(review);
    });
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