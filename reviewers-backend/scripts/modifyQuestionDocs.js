const { mongoose } = require('./init');

const { Question } = require('../api/question/questionModel');
const { User } = require('../api/auth/authModel');

User.find({}).then(async users => {
  const userCounts = users.length;
  const questions = await Question.find({});

  // console.log(users[0]._id);
  // console.log(questions.length)

  questions.forEach((q, i) => {
    // console.log(users)
    const pickedIndex = Math.floor(Math.random() * userCounts);
    Question.findOne({
              author:users[pickedIndex]
            })
            .populate('author').update(
              {_id: q._id},
              {author: users[pickedIndex]._id},
              (err, question) => {
                console.log(question.author)
                if(i === question.length-1)  {
                  process.exit();
                }
              }
    )
  })
});