const express = require('express');
const router = express.Router();
const mongoose = require('../config/connection');
const Pet = require('../models/pet');

router.get('/', async(req, res) => {
    try {
        data = await Pet.find().exec();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/', async(req, res) => {
    try {
        const pet = new Pet({
            name: req.body.name,
            sort: req.body.sort,
            gender: req.body.gender,
            breed: req.body.breed,
            size: req.body.size,
            temperament: req.body.temperament,
            age: req.body.age,
            skills: req.body.skills,
            observations: req.body.observations,
            ownerId: req.body.ownerId,
        });

        console.log(pet);
        const addedPet = await pet.save();
        res.status(201).send(addedPet);

    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/', async(req, res) => {
    const _id = req.body._id;
    try {
        modifiedPet = await Pet.findOneAndUpdate({ _id }, { $set: req.body }, { new: true });
        res.status(200).send(modifiedPet);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/', async(req, res) => {
    const _id = req.body._id;
    const status = req.body.status;
    try {
        await Pet.findOneAndUpdate({ _id }, { status }, { new: true });
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;