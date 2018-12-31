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
                      .sort('-created')
                      // reviews를 제거하고, reviewCount를 추가하고 싶다.
                      .populate('language')
                      .populate('author', '-password -email -joined')
                      .skip(fromIndex)
                      .limit(pageSize);

      res.json({
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
      if(err) {
        res.send(err);
        return;
      }

      res.json({
        data: question
      });
    });
  },
  selectOne: async ({ params: { questionId }}, res) => {
    try {
      const question = 
        await Question.findById(questionId)
                      .populate({
                        path: 'author',
                        model: 'User',
                        select: '-password -email -joined'
                      })
                      .populate('language')

      res.json({
        data: question
      });
    } catch (err) {
      res.send(err);
    }
  },
  update: ({
    params: { 
      questionId 
    }, 
    body: {
      title,
      body,
      sourceCode,
      language
    }}, res) => {

    Question.findOneAndUpdate({
        _id: questionId
      }, {
        title, body, sourceCode, language
      }, {
        new: true
      },
      (err, question) => {
        if(err) {
          res.send(err);
          return;
        }
          
        res.json({
          data: question
        })
      }
    );
  },
  delete: ({params: { questionId }}, res) => {
    Question.remove({
        _id: questionId
      },
      (err) => {
        if(err) {
          res.send(err);
          return;
        }

        res.json({message: 'Question successfully deleted'})
      }
    );
  }
};