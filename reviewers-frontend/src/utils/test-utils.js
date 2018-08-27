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
    const review = {
        id: 0,
        author: '',
        created: '',
        body: '',
        lineNumber: '',
    }

    const reviewList = [];

    Array(10).fill(0).reduce((prev, curr, index) => {
        // debugger;
        const id = index + 1;
        prev.push({
            id,
            author: 'author' + id,
            created: 'sample-date',
            body: 'review as markdown...',
            lineNumber: id
        });

        return prev;
    }, reviewList);

    return reviewList;
}

export {
    getSampleCode,
    getSampleReviewList
};