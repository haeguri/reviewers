const getSampleCode = () => {
    const code = [];

    Array(10).fill(0).forEach((v, i) => {
        let line = '';

        Array(10).fill(0).forEach(() => {
            line += (i+1);
        })

        code.push(line);
    });

    return code.join('\n');
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