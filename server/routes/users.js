const express = require('express')
// const { signJwt } = require('../middleware/auth')
const CORE = require('../lib/core');
const { routeService: { route: { USER } } } = CORE.service;
const { users: userRequestModel } = CORE.requestModel;
const { users: userController } = CORE.controller
var expressJoi = require('express-joi-validator');
const router = new express.Router()

// Sign up
router.post(USER.CREATE, expressJoi(userRequestModel.addUser), userController.register);

// Sign in
// router.post(USER.AUTH, expressJoi(userRequestModel.authUser), signJwt);

router.get(USER.UPDATEBYTOKEN, expressJoi(userRequestModel.getUserByToken), userController.getUserDataByEmailToken);

router.post(USER.UPDATE, userController.updateUser);

module.exports = router;