const express = require('express');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');

const userDetailsRouter = require('./routes/userDetails');
const paymentRouter = require('./routes/payment');
const logger = require('./utils/logger');
const passport = require('passport');
// const User = require('./models/user');
const cors = require('cors');
// const Payment = require('./models/payment');
const app = express();
require('dotenv').config({ path: './configurations/env/.env' });
require('./configurations/mongo');

app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));
app.use(cookieParser('sample'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(require('express-session')({
  secret: 'yolo 123',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api/v1', userDetailsRouter);
app.use('/api/v1', paymentRouter);

app.use((err, req, res, next) => {
  logger.error(err);
  next();
});

const port = process.env.PORT || 5000;
console.log('===========port=================' + port);
app.listen(port, () => {
  logger.info(`Server running on port ${port}`)
});
