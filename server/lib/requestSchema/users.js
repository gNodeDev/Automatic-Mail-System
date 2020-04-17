const Joi = require('@hapi/joi');
const CORE = require('../core')
const MESSAGE = CORE.message;
class UserSchema {
    // Register User
    addUser = {
        body: {
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email().required().error(() => { return { message: MESSAGE.EMAIL_NOT_VALID } }),
            password: Joi.string().required(),
        }
    }

    // Auth User (Login)
    authUser = {
        body: {
            email: Joi.string().required().error(() => { return { message: MESSAGE.EMAIL_NOT_VALID } }),
            password: Joi.string().required()
        }
    }

    // Get User By Token
    getUserByToken = {
        query:{
            token:Joi.string().required()
        }
    }

}

module.exports = new UserSchema();
