'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    lineNumber: {
      type: Number,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    created: {
      type: Date,
      default: Date.now
    },
    updated: {
      type: Date
    }
});

module.exports = {
  Review: mongoose.model('Review', ReviewSchema),
  ReviewSchema,
}