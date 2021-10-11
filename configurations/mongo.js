const mongoose = require('mongoose');
const logger = require('../utils/logger');

// connect to the database
mongoose.connect('mongodb://localhost:27017/Shopping', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
  .then(() => logger.info(`Database connected successfully`))
  .catch(err => logger.error(err));

// since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;
