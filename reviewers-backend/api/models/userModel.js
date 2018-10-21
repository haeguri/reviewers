'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    joined: {
      type: Date,
      default: Date.now
    }
});

module.exports = {
  User: mongoose.model('User', UserSchema),
  UserScheme,
};