const config = require('../configuration/config')
const dbConn = process.env.MONGO_URI || `${config.DB.HOST}:${config.DB.PORT}/${config.DB.DB_NAME}`;
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(dbConn)

  .then(() => {
    console.log('Successfully connected to database')
  })

  .catch(error => {
    console.error('Error connecting to MongoDB database', error)
  })

module.exports = mongoose
