const secret = require('../configuration/secret');
const dotenv = require('dotenv');
dotenv.config();
class Config {
    API_VERSION = 1.0
    JWT = {
        JWT_SECRET: secret.JWT_SECRET,
        JWT_ALGORITHM: 'HS384',
        JWT_EXPIRES_IN: 432000 // In seconds
    }
    DB = {
        HOST: 'mongodb://localhost',
        PORT: '27017',
        DB_NAME: 'auto_mail_db'
    }
    BASE_URL_SERVER = (process.env.NODE_ENV !== 'DEVELOPMENT') ? "http://localhost:" + process.env.PORT + "/" : "http://localhost:" + process.env.PORT + "/"
    EMAILCONFIG = {
        service:"gmail", 
        auth: {
          user: "gunjan.shahane@gmail.com",
          pass: "gunjan@739674"
        }
      }

    constructor() {
    }
}

const config = new Config();
module.exports = config;