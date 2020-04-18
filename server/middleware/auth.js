"use strict";

const Passport = require('passport').Passport
const passport = new Passport();
const JWT = require('jsonwebtoken')
const PassportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const config = require('../configuration/config');
const CORE = require('../lib/core');
const { userService } = CORE.service;
const RESPONSE = CORE.response;
const MESSAGE = CORE.message;

const jwtSecret = process.env.JWT_SECRET || config.JWT.JWT_SECRET;
const jwtAlgorithm = process.env.JWT_ALGORITHM || config.JWT.JWT_ALGORITHM;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || config.JWT.JWT_EXPIRES_IN;

const authWithJwt = async (req, res, next) 
=> {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let userData = await userService.existenceCheckByEmail(email);
        if (!userData) {
            res.send(RESPONSE.UNAUTHORIZED_ACCESS(MESSAGE.EMAIL_NOT_EXIST, MESSAGE.EMAIL_NOT_EXIST, {}));
        }
        if (userData.password !== password) {
            res.send(RESPONSE.UNAUTHORIZED_ACCESS(MESSAGE.PASSWORD_NOT_CORRECT, MESSAGE.PASSWORD_NOT_CORRECT, {}));
        }
        const token = JWT.sign(
            { email: (userData && userData.email) ? userData.email : userData.email },
            jwtSecret,
            {
                algorithm: jwtAlgorithm,
                expiresIn: jwtExpiresIn,
                subject: userData._id.toString()
            }
        )
            res.send(RESPONSE.SUCCESS(MESSAGE.LOGIN_DONE, MESSAGE.LOGIN_DONE, {userData, token}));
    } catch (error) {
        console.log("e", error);
    }
    
}; 
    
module.exports = {
    initialize: passport.initialize(), 
    signJwt:authWithJwt
}
