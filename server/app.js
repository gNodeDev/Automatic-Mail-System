var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
var app = express();

const config = require('./configuration/config');
const CORE = require('./lib/core');
const { userService } = CORE.service;
const HELPER = CORE.helper;
var ObjectId = require('mongoose').Types.ObjectId;
const routeManager = require('./services/routeManager');
const defaultRoute = require('./routes/default');
const index = require('./routes/index');

let allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,PATCH,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
  next();
}

app.use(allowCrossDomain);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(routeManager.route.DEFAULT, defaultRoute);
app.use(routeManager.getModuleUrl(routeManager.route.USER.DEFAULT), index.users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


app.use(function (resData, req, res, next) {
  if (resData && resData.output) {
    resData.status = false;
    resData.code = resData.output.statusCode;
    resData.message = resData.data[0].message;
    resData.detailedMessage = resData.output.payload.message;
  }
  res.locals.message = resData.message;
  res.locals.error = req.app.get('env') === 'development' ? resData : {};
  res.statusMessage = (resData && resData.message) ? resData.message : null
  if (resData && resData.code) {
    res.status(resData.code).json(resData);
  } else {
    res.send(resData)
  }
});

async function getUserAndSendMailInSequence() {
  let users = await userService.getAllUsers();
  users.forEach(async user => {
      if (user.isReplied == 0) {
        let mailOptions = {
          from: user.email,
          to: user.email,
          subject: 'Welcome to AMS',
        };
        let mailRenderOptions = {
          // link: `${config.BASE_URL_SERVER}/user/update?token=${user.emailToken}`,
          link: `http://localhost:4200/user/update?token=${user.emailToken}`,
          first_name: user.first_name,
          last_name: user.last_name
        };
        await HELPER.sendMail({ mailOptions, mailRenderOptions });
      } else {
        console.log("Not Sent");
      }
  });
}
getUserAndSendMailInSequence();
setInterval(() => {
  getUserAndSendMailInSequence()
}, 1800000) // 30 minutes

module.exports = app;
