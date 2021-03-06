const mongoose = require('mongoose');

const Game = require ('../../models/game.js');

let gameData = [
  {
    title: "Puissance 4 & Pizzas",
    description: "Rouge ou jaune on s'en fout, on va manger des pizzas !",
    adress: "4 villa du bois d'orme 75019 Paris",
    coordinates: [42, 3],
    time: 'Mardi 13 février - 19h',
    nbplayers: '4',
    _players: [],
    boardgame: "Puissance 4"
  },
  {
    title: "Catane for ever!",
    description: "On va s'enjailler!",
    adress: "33, rue lafayette, 75003 Paris",
    coordinates: [42, 3],
    time: 'Mardi 13 février - 19h',
    nbplayers: '6',
    _players: [],
    boardgame: "Catane"
  }
];

Game.create(gameData, (err,g) => {
  if (err) {
    throw err;
  }
  else {
    g.forEach(patrick => {
      console.log(patrick);
    });
  }
  mongoose.connection.close();
});
