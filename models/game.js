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
  _boardgame: {
    type: Schema.Types.ObjectId,
    ref: 'BoardGame'
  },
  adress: {
    type: {
      type: String
    },
    coordinates: [Number],
  },
  time: {
    type: String, // string?
    required: true
  },
  _creator: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  nbplayers: {
    type: Number,
    required: true,
    default: 0
  },
  // timestamps: {
  //   createdAt: "created_at",
  //   updatedAt: "updated_at"
  // }
});

module.exports = mongoose.model('Game', GameSchema);
