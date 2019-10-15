const mongoose = require('../config/connection');
const PetModel = require('../models/pet');
const upload = require('../services/file-upload');

const singleUpload = upload.single('image');


exports.allPetsToAdopt = async(req, res) => {
    try {
        const pets = await PetModel.find({ status: 'active' }).exec();
        res.status(200).send(pets);
    } catch (error) {
        res.status(500).send(error);

    }
};

exports.petDetails = async(req, res) => {
    try {
        const _id = req.params.id;
        const pet = await PetModel.findById({ _id }).exec();
        res.status(200).send(pet);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.addPet = async(req, res) => {
    singleUpload(req, res, async(err) => {
        if (err) {
            return res.status(422).send({ error: { title: 'File Upload Error', detail: err.message } });
        }
        petImageURL = req.file.location;
        console.log('location', req.file.location);

        const pet = new PetModel({
            name: req.body.name,
            sort: req.body.sort,
            gender: req.body.gender,
            breed: req.body.breed,
            size: req.body.size,
            temperament: req.body.temperament,
            age: req.body.age,
            hometown: req.body.hometown,
            skills: req.body.skills,
            observations: req.body.observations,
            ownerId: req.body.ownerId,
            imageURL: petImageURL
        });

        console.log('pet', pet);
        try {
            const petSaved = await pet.save();
            res.status(201).send(petSaved);

        } catch (error) {
            res.status(500).send(error);
        }
    });
};


exports.uploadImage = async(req, res) => {
    singleUpload(req, res, (err) => {
        if (err) {
            return res.status(422).send({ error: { title: 'File Upload Error', detail: err.message } });
        }
        return res.status(200).json({ 'imageUrl': req.file.location });
    });
};

exports.updatePet = async(req, res) => {
    const _id = req.body._id;
    try {
        modifiedPet = await PetModel.findOneAndUpdate({ _id }, { $set: req.body }, { new: true });
        res.status(200).send(modifiedPet);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.changePetStatus = async(req, res) => {
    const _id = req.body._id;
    const status = req.body.status;
    try {
        modifiedPet = await PetModel.findOneAndUpdate({ _id }, { status }, { new: true });
        res.status(200).json({ id: modifiedPet.id, status: modifiedPet.status });
    } catch (error) {
        res.status(500).send(error);
    }
};