const mongoose = require('mongoose');
var multer = require('multer');
const Schema = mongoose.Schema;
const BoardGame = require('./boardgame');

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  _games: [{
    type: Schema.Types.ObjectId,
    ref: 'Game'
  }],
  description: String,
  imgUrl: {
    type: String,
    default: "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250",
  },
  _boardGame: [{
    type: Schema.Types.ObjectId,
    ref: 'BoardGame'
  }],
  type: [{
    type: String,
    enum: ['Luck', 'Strategy', 'Others'],
    required: true
  }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;