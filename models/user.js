const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BoardGame = require('./boardgame');

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  description: String,
  imgUrl: {
    type: String,
    default: "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250"
  },
  // boardgames owned
  _boardGame: [{
    type: Schema.Types.ObjectId,
    ref: 'BoardGame'
  }],
  // user belongs to X team
  // _team: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Team'
  // },
  // types of games
  type: [{
    type: String,
    enum: ['Luck', 'Strategy', 'Others'],
    required: true
  }],
  // timestamps: {
  //   createdAt: "created_at",
  //   updatedAt: "updated_at"
  // }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
