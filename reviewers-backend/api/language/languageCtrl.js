'use strict';

const { Language } = require('./languageModel');

module.exports = {
  all: async (req, res) => {
    try {
      const result = await Language.find({});
      res.json({
        data: result
      });
    } catch (err) {
      res.send(err);
    }
  }
};