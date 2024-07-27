const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String, 
        required: false
    },
    role: {
        type: String,
        enum: ['ADMIN', 'GENERAL'],
        default: 'GENERAL'
    },
    /*isActive: {
        type: Boolean,
        default: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }*/
},{
    timestamps: true
})

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;