const express = require('express');
const app = express();

app.use('/a', (req, res) => {
  res.send('a page!');
});

app.use('/b', (req, res) => {
  res.send('b page!');
})

app.listen(4000, () => {
  console.log('express server running on 4000');
});