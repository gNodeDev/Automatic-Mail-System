const mongoose = require('./init')
const userSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    password: { type: String },
    isReplied: { type: Number, default: 0 },
    emailToken: { type: String },
    address: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('users', userSchema)