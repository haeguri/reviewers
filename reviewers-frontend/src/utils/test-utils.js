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
            created: 'sample-date',
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
    getSampleCode,
    getSampleReviewList,
    getSampleMarkdown
};