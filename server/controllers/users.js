const CORE = require('./../lib/core');
const _ = require('lodash')
const { userService } = CORE.service;
const { users } = CORE.model;
var md5 = require('md5');
var ObjectId = require('mongoose').Types.ObjectId;
const RESPONSE = CORE.response;
const MESSAGE = CORE.message;

// For Register
const register = async (req, res) => {
    try {
        req.body.isReplied = 0;
        req.body.emailToken = md5(req.body.email);
        req.body.password = md5(req.body.password);
        req.body.address = "";
        const userObject = new users(req.body);
        let userDone = await userService.createUser(userObject);
        res.send(RESPONSE.SUCCESS(MESSAGE.SUCCESS_ADDED_USERS, MESSAGE.SUCCESS_ADDED_USERS, userDone));
    } catch (error) {
        console.log("e", error);
    }
}

// For Getting User Data with Email Token
const getUserDataByEmailToken = async (req, res) => {
    try {
        let userData = await userService.getUserDataByToken(req.query.token);
        res.send(RESPONSE.SUCCESS(MESSAGE.SUCCESS, MESSAGE.SUCCESS, userData));
    } catch (error) {
        console.log('e', error);
    }
}

// Update User
const updateUser = async (req, res) => {
    try {
        req.body.isReplied = 1;
        let userData = await userService.updateUserData({ '_id': ObjectId(req.body._id) }, req.body);
        res.send(RESPONSE.SUCCESS(MESSAGE.UPDATE_SUCCESS, MESSAGE.UPDATE_SUCCESS, userData));
    } catch (error) {
        console.log('e', error);
    }

}

module.exports = { register, getUserDataByEmailToken, updateUser }





