const dbClient = require('mongodb').MongoClient;

// const questionData = {
//   author: {
    
//   } 
// }

dbClient.connect('mongodb://127.0.0.1:27017/reviewersDB', (err, db) => {
  if(err) {
    console.log(err);
  } else {
    // db connection success.

    db.close();
  }
});