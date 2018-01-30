const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/game-on', {
  useMongoClient: true
});

const BoardGame = require ('../models/boardgame.js');

let boardGameData = [
  {
    title: "Monopoly",
    description: "Le meilleur jeu pour perdre ses amis",
    category: 'lol',
    minPlayer: '3',
    maxPlayer: '8',
    duration: '30 - 120',
  },
  {
    title: "Dominion",
    description: "Mon jeu de plateau préféré",
    category: 'sport',
    minPlayer: '2',
    maxPlayer: '6',
    duration: '30 - 60',
  }
];

BoardGame.create(boardGameData, (err,bg) => {
  if (err) {
    throw err;
  }
  else {
    bg.forEach(patrick => {
      console.log(patrick);
    });
  }
  mongoose.connection.close();
});