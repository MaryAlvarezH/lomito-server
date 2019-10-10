const mongoose = require('../config/connection');
const UserModel = require('../models/user');

exports.me = async(req, res, next) => {
    try {
        const user = await UserModel.findById(req.body.userId);
        if (user !== null) {
            res.status(200).json(user);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        res.status(500).send();
    }
};

exports.updateInfo = async(req, res, next) => {
    const _id = req.body._id;
    try {
        const modifiedUserId = await UserModel.findOneAndUpdate({ _id }, { $set: req.body }, { new: true });
        res.status(200).send(modifiedUserId);
    } catch (error) {
        res.status(550).send(error);
    }
};

exports.updatePassword = async(req, res, next) => {
    const _id = req.body._id;
    const password = req.body.password;
    try {
        const resp = await UserModel.findOneAndUpdate({ _id }, { password }, { new: true }).exec();
        res.status(200).send({ user: { _id: resp._id, username: resp.username }, status: 'ok' });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.disableAccount = async(req, res, next) => {
    const _id = req.params.id;
    try {
        await UserModel.findOneAndUpdate({ _id }, { status: 'inactive' }, { new: true });
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getAll = async(req, res, next) => {
    try {
        data = await UserModel.find().exec();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
};