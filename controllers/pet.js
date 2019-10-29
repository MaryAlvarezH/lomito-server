const mongoose = require('../config/connection');
const PetModel = require('../models/pet');
const upload = require('../services/file-upload');

// se delimina el key de la imagen y se indica que se subira unicamente una imagen
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
    const age = {
        number: req.body.age_number,
        timePeriod: req.body.age_timePeriod
    }

    const pet = new PetModel({
        name: req.body.name,
        sort: req.body.sort,
        gender: req.body.gender,
        breed: req.body.breed,
        size: req.body.size,
        temperament: req.body.temperament,
        age,
        hometown: req.body.hometown,
        skills: req.body.skills,
        observations: req.body.observations,
        ownerId: req.body.ownerId
    });

    try {
        const petSaved = await pet.save();
        res.status(201).send(petSaved);

    } catch (error) {
        res.status(500).send(error);
    }
};

exports.uploadImage = async(req, res) => {
    //sobre el mismo request solicito a singleUpload que haga lo suyo
    singleUpload(req, res, async(err) => {
        if (err) {
            return res.status(422).send({ error: { title: 'File Upload Error', detail: err.message } });
        }
        const _id = req.body.id;
        const imageURL = req.file.location;
        const petObject = await PetModel.findByIdAndUpdate({ _id }, { imageURL }, { new: true });
        return res.status(200).send(petObject);
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