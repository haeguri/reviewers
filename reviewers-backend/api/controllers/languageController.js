'use strict';

const { Language } = require('../models/languageModel');

module.exports = {
  all: (req, res) => {
    Language.find({}, (err, language) => {
      if(err)
        res.send(err);
      res.json(language);
    });  
  }
};