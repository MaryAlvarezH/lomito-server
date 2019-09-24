const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const interactionSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    petId: {
        type: ObjectId,
        ref: 'Pet',
        required: true
    },
    like: Boolean,
    comment: String,
    status: {
        type: String,
        default: 'active'
    }
}, { timestamps: true });

const Interaction = mongoose.model('Interaction', interactionSchema);

module.exports = Interaction;