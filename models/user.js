const mongoose = require('mongoose');
var multer = require('multer');
const Schema = mongoose.Schema;
const Game = require('./game');

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  description: String,
  imgUrl: {
    type: String,
    default: "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250",
  },
  boardGame: String,
  _games: [{
    type: Schema.Types.ObjectId,
    ref: 'Game'
  }],
  _gamesCreated: [{
    default: [],
    type: Schema.Types.ObjectId,
    ref: 'GameCreated'
  }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
