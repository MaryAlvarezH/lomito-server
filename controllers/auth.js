const mongoose = require('../config/connection');
const UserModel = require('../models/user');

exports.signUp = async(req, res, next) => {
    const user = new UserModel({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address
    });

    try {
        data = await user.save();
        res.status(201).json(data);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.login = async(req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await UserModel.findOne({ username }).select('password');
    console.log('user', user);

    if (!user) {
        res.status(404).json({ message: 'wrong credentials' });
    }

    if (password !== user.password) {
        res.status(404).json({ message: 'wrong credentials' });
    }

    res.status(200).json({ user: { _id: user._id }, access: 'ok' });
};