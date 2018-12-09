const code = 
`// ECMA-262의 진행 단계, 5판(Edition), 15.4.4.21
// 참조: http://es5.github.io/#x15.4.4.21
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
if (!Array.prototype.reduce) {
  Object.defineProperty(Array.prototype, 'reduce', {
    value: function(callback /*, initialValue*/) {
      if (this === null) {
        throw new TypeError( 'Array.prototype.reduce ' + 
          'called on null or undefined' );
      }
      if (typeof callback !== 'function') {
        throw new TypeError( callback +
          ' is not a function');
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0; 

      // Steps 3, 4, 5, 6, 7      
      var k = 0; 
      var value;

      if (arguments.length >= 2) {
        value = arguments[1];
      } else {
        while (k < len && !(k in o)) {
          k++; 
        }

        // 3. If len is 0 and initialValue is not present,
        //    throw a TypeError exception.
        if (k >= len) {
          throw new TypeError( 'Reduce of empty array ' +
            'with no initial value' );
        }
        value = o[k++];
      }

      // 8. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kPresent be ? HasProperty(O, Pk).
        // c. If kPresent is true, then
        //    i.  Let kValue be ? Get(O, Pk).
        //    ii. Let accumulator be ? Call(
        //          callbackfn, undefined,
        //          « accumulator, kValue, k, O »).
        if (k in o) {
          value = callback(value, o[k], k, o);
        }

        // d. Increase k by 1.      
        k++;
      }

      // 9. Return accumulator.
      return value;
    }
  });
}
`;

const getSampleCode = () => {
  return code;
}

const getSampleQuestionList = () => {
  const languageList = [
    'JavaScript',
    'Java',
    'Python',
    'Scala'
  ]
  return Array(550).fill(0).map((value, idx) => {
    return {
      id: idx+1,
      title: `${idx+1}'s question title. title. title. title..`,
      author: `author${idx+1}`,
      reviewCount: Math.ceil(Math.random() * 5),
      language: (_=>{
        const randomPick = Math.ceil(Math.random() * 4) - 1;
        return languageList[randomPick];
      })(),
      created: '2018-07-01',
    }
  })
}

/**
 * 데이터가 총 44개
 * page 1 ? list.slice(0, 10)
 * page 2 ? list.slice(10, 20)
 * page 3 ? list.slice(20, 30)
 * page 4 ? list.slice(30, 40)
 * page 5 ? list.slice(40, 44)
 */

const getQuestionsWithPage = (page, pageSize) => {
  const list = getSampleQuestionList();
  
  const from = (pageSize * (page-1))
  const to = (pageSize * page);
  const pages = Math.ceil(list.length / pageSize);

  return {
    pages,
    data: list.slice(from, to)
  };
}

const getSampleReviewList = () => {
    const reviewList = [];

    Array(20).fill(0).reduce((prev, curr, index) => {
        // debugger;
        const id = index + 1;
        const randomLineNumber = Math.ceil(Math.random()*5);
        prev.push({
            id,
            author: 'author' + id,
            questionId: 1,
            lineNumber: randomLineNumber,
            created: '2018-09-23 13:14:32',
            updated: '2018-09-23 23:44:00',
            body: [
              `<h1>${randomLineNumber} line review!</h1>`,
              '<p>Review!</p>',
              '<ul>Review!</ul>',
              '<li>Review!</li>',
              '<li>Review!</li>',
              '<h1>Review!</h1>',
              '<p>Review!</p>'
            ].join('\n')
        });

        return prev;
    }, reviewList);

    return reviewList;
}

const getSampleMarkdown = () => [
  "# test",
  "# test",
  "# test",
  "# test",
  "# test",
  "# test",
  "# test",
  "# test",
  "# test",
  "# test",
  '- asdfasdfasdf',
  '- asdfasdfsadf'
].join('\n');

export {
  getQuestionsWithPage,
  getSampleCode,
  getSampleQuestionList,
  getSampleReviewList,
  getSampleMarkdown
};