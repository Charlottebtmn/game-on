const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Types = require('./type');

const BoardgameSchema = new Schema({
  title: {
    type: String,
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
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

module.exports = mongoose.model('Boardgame', BoardgameSchema);