const mogoose = require('mongoose');

const userSchema = new mogoose.Schema({
    name: String,
    email: String,
});

module.exports = mogoose.model('User', userSchema);