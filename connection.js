const mongoose = require('mongoose');

let isConnected;

module.exports.connectToDatabase = async => {
  if(isConnected){
    console.log('=> using existing database connection');
    return Promise.resolve();
  }
  console.log('=> using new database connection');
  return mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@kahwin-checklist-0-rzfig.mongodb.net/test?retryWrites=true&w=majority`)
    .then(db => { 
      isConnected = db.connections[0].readyState;
    }).catch(err => {
       throw new Error(err);
    });
};