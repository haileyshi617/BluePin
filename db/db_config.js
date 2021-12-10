const mongoose = require('mongoose');

const db = {};
db.mongoose = mongoose;
// db.url = process.env.MONGODB_URI; //connection to atlas
db.url = "mongodb+srv://satoshi:mongodb@cluster0.heur9.mongodb.net/bluepinDatabase?retryWrites=true&w=majority"; //connection to atlas

module.exports = db;