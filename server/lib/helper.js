// const CORE = require('./core');
// const _ = require('lodash')
// var moment = require('moment');
const config = require('../configuration/config')
var md5 = require('md5');
const nodeMailer = require("nodemailer");
const transporter = nodeMailer.createTransport(config.EMAILCONFIG);
var path = require("path");
const ejs = require("ejs");

const sendMail = async (object) => {
  let file = path.join(__dirname, "../../server/views/demo.ejs");
  ejs.renderFile(file, object.mailRenderOptions, function (err, htmlString) {
    if (err) console.error("error render file", err);
    object.mailOptions.html = htmlString;
    transporter.sendMail(object.mailOptions, function(error, info){
      if (error) {
        console.log(error);
        return true; 
      } else {
        console.log('Email sent for : ' + object.mailOptions.to +" <<<=>>>" + info.response);
        return true;
      }
    });
  });      
} 

const md5Password = (password) => {
    return md5(password);
}

module.exports = {sendMail, md5Password}

