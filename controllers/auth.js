const jwt = require("jwt-simple");
const mongoose = require('../config/connection');
const config = require('../config/JWTSecret')
const UserModel = require('../models/user');

exports.signUp = async(req, res, next) => {

    const userRegister = await UserModel.findOne({username: req.body.username});
    
    if (userRegister === null) {
        const user = new UserModel();
        user.username = req.body.username;
        user.name = req.body.name;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = await user.encryptPassword(req.body.password);
        if (req.body.address) {
            user.address = req.body.address;
        }
        try {
            data = await user.save();
            res.status(201).json(data);
        } catch (error) {
            res.status(500).send(error);
        }

    } else {
        res.status(200).json({status:'error', message:'user already exist'})
    }
};

exports.login = async(req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await UserModel.findOne({ username }).select('password');
        
        if (!user) {
            return res.status(404).json({ status:'error', message: 'wrong credentials' });
        }
        const validPassword = await user.checkPassword(password);
        if (validPassword) {
            const token = jwt.encode({id: user._id}, config.JWTSecret);
            return res.json({user: user._id , token});
            
        } else {
            return res.status(404).json({ status:'error', message: 'wrong credentials' });
        }

    } catch (error) {
        return res.status(500).send(error);
        
    }
    
};