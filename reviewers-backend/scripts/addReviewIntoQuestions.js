/**
 * Script for put Review mockup data.
 */

require('./init');

const { Review } = require('../api/review/reviewModel');
const { User } = require('../api/auth/authModel');
const { Question } = require('../api/question/questionModel');
const sampleReviewBody = require('../sampleData/reviewBody');

async function main() {
  let users = await User.find({});
  let userCount = users.length;
  let questions = await Question.find({});

  const maxReviewCount = 30;
  // console.log(questions);
  // let count = 0;
  for(let q of questions) {
    const totalLine = q.body.split('\n').length;
    let maxLineNumber = totalLine < 10 ? totalLine : 10;
    
    let lineNumberSet = [];

    for(let i = 0; i < maxReviewCount; i++) {
      lineNumberSet.push(Math.ceil(Math.random() * maxLineNumber))
    }

    const reviews = [];
    for(let i = 0; i < maxReviewCount; i++) {
      let author = users[Math.floor(Math.random() * userCount)]._id;
      let question = q._id;
      let body = sampleReviewBody;
      let lineNumber = lineNumberSet[Math.floor(Math.random() * lineNumberSet.length)];

      const newReview = new Review({
        author,
        question,
        body,
        lineNumber
      })

      const result = await newReview.save();
      reviews.push(result);
      // tt += (' ' + lineNumber);
    }

    q.reviews = reviews;
    const result = await q.save();

    // if(count++ === 0) {
    //   break;
    // }
  }

  process.exit();
}

main();

/**
 * 1. Question 데이터를 불러온다.
 * 2. User 데이터를 불러온다. 
 * 3. User 데이터의 length를 userCounts로 구한다.
 * 4. Question 데이터를 순회한다.
 *    - reviews를 준비한다.
 *      - 최대로 가능한 lineNumber을 totalLine에 할당
 *        > question.body를 '\n'으로 split하고 length를 구한다.
 *      - reviewCount를 30으로 지정한다.
 *      - lineNumberSet을 구해놓는다.
 *        > reviewCount 만큼 for loop를 실행한다.
 *        > 1 ~ totalLine(max:10) 사이에 random한 숫자를 lineNumberSet에 push
 *      - Review를 생성한다.
 *        - reviewCount 만큼 for loop를 실행한다.
 *        - author
 *          > 1 ~ userCounts 사이에 random한 것을 하나 고른다.
 *          > 그것을 index로 하여 User 데이터에서 하나 뽑는다.
 *          > user._id를 할당
 *        - question
 *          > qustion._id를 할당
 *        - lineNumber
 *          > lineNumberSet에서 random한 것을 하나 뽑아서 넣는다.
 *        - body
 *          > sampleReviewBody 할당
 *    
 *    - question.reviews
 *  5 process.exit()
 */