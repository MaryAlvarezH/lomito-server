const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const AdoptionSchema = new Schema({
    petId: {
        type: ObjectId,
        ref: 'Pet',
        required: true
    },
    applicants: [{
        userId: {
            type: ObjectId,
            ref: 'User',
            required: true
        },
        status: {
            type: String,
            default: 'active'
        },
        createdAt: Date,
        updatedAt: Date,
    }],
});

const Adoption = mongoose.model('Adoption', AdoptionSchema);

module.exports = Adoption;