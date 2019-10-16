const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const petSchema = new Schema({
    name: String,
    sort: String,
    gender: String,
    breed: String,
    size: String,
    temperament: String,
    age: {
        type: {
            number: Number,
            timePeriod: String,
        }
    },
    hometown: String,
    skills: [],
    observations: [],
    ownerId: {
        type: ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: 'active'
    },
    imageURL: String,
}, { timestamps: true });

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;