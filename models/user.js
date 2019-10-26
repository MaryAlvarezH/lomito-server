const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    name: {
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
            state: String,
            city: String,
            zip: String
        },
        required: false
    },
    status: {
        type: String,
        default: 'active'
    }
}, { timestamps: true });

userSchema.methods.encryptPassword = async password => {
    try{
        const salt = await bcrypt.genSaltSync(5);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch(err) {
        console.log(err);
    }
}

userSchema.methods.checkPassword = async function(password) {

    console.log('password',password )
    console.log('this.password',this.password )
    try {
        const result = await bcrypt.compare(password, this.password);
        return result;
        
    } catch (error) {
        console.log(error);
    }
   
}

const User = mongoose.model('User', userSchema);

module.exports = User;