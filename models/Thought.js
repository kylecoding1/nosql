const mongoose = require('mongoose');

const ReactionSchema = new mongoose.Schema({
  username: String,
  text: String,

});

const ThoughtSchema = new mongoose.Schema({
  text: String,
  username: String,
  reactions: [ReactionSchema],

});

module.exports = mongoose.model('Thought', ThoughtSchema);
