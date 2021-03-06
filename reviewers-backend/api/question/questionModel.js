'use strict';

const mongoose = require('mongoose');
const { ReviewSchema } = require('../review/reviewModel');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true
    },
    sourceCode: {
      type: String,
      required: true,
    },
    reviews: [
      { type: ReviewSchema, ref: 'Review' }
    ],
    language: {
      type: Schema.Types.ObjectId,
      ref: 'Language',
      required: true
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
  Question: mongoose.model('Question', QuestionSchema),
  QuestionSchema
};