const express = require('express');
const router = express.Router();
const mongoose = require('../config/connection');
const Interaction = require('../models/interaction');

router.get('/', async(req, res) => {
    const petId = req.query.petId;
    let interactions;

    try {
        if (petId) {
            interactions = await Interaction.find({ petId: petId }).exec();
        } else {
            interactions = await Interaction.find().exec();
        }
        res.status(200).send(interactions);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/', async(req, res) => {
    try {
        const interaction = new Interaction({
            userId: req.body.userId,
            petId: req.body.petId,
            like: req.body.like,
            comment: req.body.comment,
        });
        const interactionAdded = await interaction.save();
        res.status(201).send(interactionAdded);

    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/', async(req, res) => {
    const _id = req.body._id;
    const like = req.body.like;
    const comment = req.body.comment;
    let interactionUpdated;

    try {
        if (like) {
            interactionUpdated = await Interaction.findOneAndUpdate({ _id }, { like, status: 'inactive' }, { new: true });
        } else if (comment) {
            interactionUpdated = await Interaction.findOneAndUpdate({ _id }, { comment }, { new: true });
        }
        res.status(200).send(interactionUpdated);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/:id', async(req, res) => {
    const _id = req.params.id;
    try {
        await Interaction.findOneAndUpdate({ _id }, { status: 'inactive' });
        res.status(204).send();

    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;