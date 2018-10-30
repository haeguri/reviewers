const express = require('express');
const apiRouter = express.Router();

const questionRouter = express.Router();
const languageRouter = express.Router();
const reviewRouter = express.Router();
const authRouter = express.Router();

require('./question/questionRoute')(questionRouter);
require('./language/languageRoute')(languageRouter);
require('./review/reviewRoute')(reviewRouter);
require('./auth/authRoute')(authRouter);

apiRouter.use('/questions', questionRouter);
apiRouter.use('/languages', languageRouter);
apiRouter.use('/reviews',   reviewRouter);
apiRouter.use('/auth',      authRouter);

module.exports = apiRouter;
