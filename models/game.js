const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const BoardGame = require('./boardgame');

const GameSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  boardgame: {
    type: String,
    required: true
  },
  adress: String,
  coordinates: [Number],
  time: {
    type: String,
    required: true
  },
  nbplayersmin: {
    type: Number,
    required: true,
    default: 0
  },
  nbplayersmax: {
    type: Number,
    required: true,
    default: 0
  },
  _creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  _players: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
});

module.exports = mongoose.model('Game', GameSchema);