const { mongoose } = require('./init');

const { Question } = require('../api/question/questionModel');
const { Language } = require('../api/language/languageModel');
const { User } = require('../api/auth/authModel');

User.find({}).then(async users => {
  const languages = await Language.find({});
  const questions = await Question.find({});

  questions.forEach(async (q, i)=> {
    const pickedIndex = Math.floor(Math.random() * languages.length);

    q.language = languages[pickedIndex];
    await q.save();

    if(i === questions.length - 1) {
      process.exit();
    }
  })
  // const userCounts = users.length;
  // const questions = await Question.find({});

  // questions.forEach((q, i) => {
  //   const pickedIndex = Math.floor(Math.random() * userCounts);
  //   Question.findOne({
  //             author:users[pickedIndex]
  //           })
  //           .populate('author').update(
  //             {_id: q._id},
  //             {author: users[pickedIndex]._id},
  //             (err, question) => {
  //               console.log(question.author)
  //               if(i === question.length-1)  {
  //                 process.exit();
  //               }
  //             }
  //   )
  // })
});