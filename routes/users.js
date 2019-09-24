const express = require('express');
const router = express.Router();
const mongoose = require('../config/connection');
const User = require('../models/user');

router.get('/', async(req, res) => {
    try {
        data = await User.find().exec();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/', async(req, res) => {
    const user = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address
    });
    try {
        data = await user.save();
        res.status(201).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async(req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findOne({ _id: userId }).exec();
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/', async(req, res) => {
    const _id = req.body._id;
    try {
        const modifiedUserId = await User.findOneAndUpdate({ _id }, { $set: req.body }, { new: true });
        res.status(200).send(modifiedUserId);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/', async(req, res) => {
    const _id = req.body._id;
    const password = req.body.password;
    try {
        const resp = await User.findOneAndUpdate({ _id }, { password }, { new: true }).exec();
        res.status(200).send(resp);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/:id', async(req, res) => {
    const _id = req.params.id;
    try {
        await User.findOneAndUpdate({ _id }, { status: 'inactive' }, { new: true });
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = router;