const express = require('express');
const router = express.Router();
const CORE = require('../lib/core');
const { routeService: routeManager } = CORE.service;
const RESPONSE = CORE.response;
const MESSAGE = CORE.message;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express.js Boilerplate' });
});

router.get(`${routeManager.getModuleUrl('')}${routeManager.route.AUTH_FAILURE}/:type`, function (req, res, next) {
  switch (req.params.type) {
    case 'local':
      next(RESPONSE.UNAUTHORIZED_ACCESS(MESSAGE.UNAUTHORIZED_ACCESS, MESSAGE.NA, {}));
      break;
    case 'jwt':
      next(RESPONSE.FORBIDDEN(MESSAGE.INVALID_TOKEN, MESSAGE.NA, {}));
      break;
    default:
      next(RESPONSE.FORBIDDEN(MESSAGE.INVALID_TOKEN, MESSAGE.NA, {}));
      break;
  }
});

module.exports = router;
