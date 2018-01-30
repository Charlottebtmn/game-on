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
    enum: [],
    required: true
  },
  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // required: true
  },
  minPlayer: {
    type: Number,
  },
  maxPlayer: {
    type: Number,
  },
  duration: {
    type: Number,
  },
  // timestamps: {
  //   createdAt: "created_at",
  //   updatedAt: "updated_at"
  // }
});

module.exports = mongoose.model('Boardgame', BoardgameSchema);