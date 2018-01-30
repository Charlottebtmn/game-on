const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  description: String,
  imgUrl: {
    type: String,
    default: "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250"
  },
  // games owned
  _game: {
    type: Schema.Types.ObjectId,
    ref: 'Game'
  },
  // user belongs to X team 
  _team: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  // types of games  
  _type: {
    type: Schema.Types.ObjectId,
    ref: 'Types'
  },
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;