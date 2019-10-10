const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: String,
    address: {
        type: {
            street: String,
            city: String,
            state: String,
            zip: String
        },
        required: false
    },
    status: {
        type: String,
        default: 'active'
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;