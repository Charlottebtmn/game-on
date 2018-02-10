const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/game-on');


require("./games.js");
require("./users.js");
require("./boardgames.js");
