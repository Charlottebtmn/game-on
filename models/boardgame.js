const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const BoardgameSchema = new Schema({
  title: {
    type: String,
    enum: [],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: Types,
    required: true
  },
  _owner: {
    type: Schema.User.ObjectId,
    ref: 'User',
    // required: true
  },
  minPlayer: {
    type: Integer,
  },
  maxPlayer: {
    type: Integer,
  },
  duration: {
    type: Integer,
  },
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

module.exports = mongoose.model('Boardgame', BoardgameSchema);