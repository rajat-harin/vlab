const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password : {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    email : {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true,
    },
    isAdmin : {
        type: Boolean,
        required: true,
    },
    confirmed : {
        type: Boolean,
        default: false,
        required: true,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;