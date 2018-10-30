'use strict';

const { Question } = require('./questionModel');

module.exports = {
  all: (req, res) => {
    Question.find({}, (err, question) => {
      if(err)
        res.send(err);
      res.json(question);
    });  
  },
  create: (req, res) => {
    const newQuestion = new Question(req.body);
    newQuestion.save((err, question) => {
      if(err)
        res.send(err);
      res.json(question);
    });
  },
  selectOne: (req, res) => {
    Question.findById(req.params.questionId, (err, question) => {
      if (err)
        res.send(err);
      res.json(question);
    });
  },
  update: (req, res) => {
    Question.findOneAndUpdate(
      {_id: req.params.questionId},
      req.body,
      {new: true},
      (err, question) => {
        if(err)
          res.send(err);
        res.json(question)
      }
    );
  },
  delete: (req, res) => {
    Question.remove(
      {_id: req.params.questionId},
      (err, question) => {
        if(err)
          res.send(err);
        res.json({message: 'Question successfully deleted'})
      }
    );
  }
};