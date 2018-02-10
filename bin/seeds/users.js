const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/game-on', {
  useMongoClient: true
});

const User = require ('../../models/user.js');

let userData = [
  {
    _games: [],
    _gamesCreated: [],
    email: 'vivian.sarazin@gmail.com',
    username: 'VivianSolide',
    password: 'patrick',
    description: 'lorem ipsum dolor sit amet',
    imgUrl: 'https://media-exp2.licdn.com/mpr/mpr/shrinknp_200_200/AAIA_wDGAAAAAQAAAAAAAAp_AAAAJDQzMTFhZmNhLTM1ODgtNGU0YS04YWM1LTdhMTcxM2JlZGVmMg.jpg',
  },
  {
    _games: [],
    _gamesCreated: [],
    email: 'charlotte@ironhack.com',
    username: 'CreepyCharlotte',
    password: 'yolo2000',
    description: 'lorem ipsum dolor sit amet',
    imgUrl: 'https://cdn-images-1.medium.com/fit/c/200/200/1*0NjkkbboryozL6fb54KJjg.png',
  },
];

User.create(userData, (err,user) => {
  if (err) {
    throw err;
  }
  else {
    user.forEach(patrick => {
      console.log(patrick);
    });
  }
  mongoose.connection.close();
});
