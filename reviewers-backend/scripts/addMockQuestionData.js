/**
 * Script for put Question's sample data.
 */

require('./init');

const { Question } = require('../api/question/questionModel');
const sampleSourceCode = require('../sampleData/sourceCode');
const sampleBody = require('../sampleData/body');

const languageList = [
  'JavaScript',
  'Java',
  'Python',
  'Scala'
];

const targetCount = 200;
for(let i = 0; i < targetCount; i++) {
  const newQuestion = new Question({
    title: '샘플 테스트 '+(new Date()).getTime(),
    body: sampleBody,
    sourceCode: sampleSourceCode,
    language: languageList[Math.floor(Math.random()*4)]
  });

  newQuestion.save().then(result => {
    if (i === targetCount-1) {
      process.exit();
    }
  });
}