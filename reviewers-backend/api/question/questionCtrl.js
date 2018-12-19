'use strict';

const { Question } = require('./questionModel');

module.exports = {
  all: async ({query: {pageNo = 1, pageSize = 10}}, res) => {
    pageNo = Number(pageNo);
    pageSize = Number(pageSize);

    const totalDataCount = await Question.count({}).exec();
    const totalPageCount = Math.ceil(totalDataCount/pageSize);
    const fromIndex = pageSize * (pageNo - 1);

    try {
      const questions = 
        await Question.find()
        .populate('author', '-password -email -joined')
        .skip(fromIndex)
        .limit(pageSize);

      res.send({
        totalPageCount,
        totalDataCount,
        length: questions.length,
        data: questions
      });
    } catch (err) {
      res.send(err);
    }
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