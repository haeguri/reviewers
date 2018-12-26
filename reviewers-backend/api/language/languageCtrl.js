'use strict';

const { Language } = require('./languageModel');

module.exports = {
  all: async (req, res) => {
    const query = Language.find({})
    try {
      const result = await query.select('-_id');
      res.send({
        data: result
      });
    } catch (err) {
      res.send(err);
    }
  }
};