const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    name: {
        type: String
      },
    email: {
        type: String
      },
    phone:{
      type: String
    },
    password:{
        type: String
    },
    dob:{
        type: String
    },
    url:{
      type: String
    },
    isactive: {
        type: Boolean
      },
    token:{
        type: String
    },

},{timestamps: true})

const User = mongoose.model('User', userScheme);

module.exports = User;