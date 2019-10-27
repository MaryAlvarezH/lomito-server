const AdoptionModel = require('../models/adoption');
const moment = require('moment');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.getAllAdoptions = async(req, res) => {
    try {
        const allAdoptions = await AdoptionModel.find();
        res.status(200).send(allAdoptions);

    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getAddoptionByPetId = async(req, res) => {
    const petId = req.params.id;
    const adoption = await AdoptionModel.aggregate([
        { $match: 
            { "petId" : ObjectId(petId)} 
        },
        { $lookup: 
            {
                from: "pets",
                localField:"petId",
                foreignField: "_id",
                as: "pet_details"
            }
        },
        {
            $lookup:  
                {
                    from: "users",
                    localField:"applicants.userId",
                    foreignField: "_id",
                    as: "applicants_details"
                }
        },
        { $project: {
            petId: "$petId",
            pet_details: "$pet_details",
            applicants_details: "$applicants_details",
            
        }}
    ]).exec();
    res.send(adoption);
};

exports.create = async(req, res) => {
    const applicants = req.body.applicants;

    const applicantsRes = applicants.map(application => {
        currentDate = Date(moment());
        application.createdAt = currentDate;
        application.updatedAt = currentDate;
        return application;
    });

    const adoption = new AdoptionModel({
        petId: req.body.petId,
        applicants: applicantsRes
    });
    try {
        const adoptionSaved = await adoption.save();
        res.status(201).send(adoptionSaved);

    } catch (error) {
        res.status(500).send(error);
    }
};

exports.addApplicant = async(req, res) => {
    const petId = req.body.petId;
    const newApplicant = req.body.applicants;
    const newApplicantData = newApplicant.map(application => {
        currentDate = Date(moment());
        application.createdAt = currentDate;
        application.updatedAt = currentDate;
        return application;
    });

    try {
        const [adoption] = await AdoptionModel.find({ petId });
        const applicantsData = adoption.applicants;

        const updatedApplicantList = [...applicantsData, ...newApplicantData];
        const adoptionModified = await AdoptionModel.findOneAndUpdate({ petId }, { applicants: updatedApplicantList }, { new: true }).exec();

        res.status(200).send(adoptionModified);

    } catch (error) {
        res.status(500).send(error);

    }
};

exports.removeApplication = async(req, res) => {
    const petId = req.body.petId;
    const userId = req.body.userId;

    const [adoption] = await AdoptionModel.find({ petId });
    let applicantsData = adoption.applicants;

    const newData = applicantsData.map(application => {
        if (application.userId == userId) {
            currentDate = Date(moment());
            application.status = 'inactive';
            application.updatedAt = currentDate;
        }
        return application;
    });

    try {
        const adoptionModified = await AdoptionModel.findOneAndUpdate({ petId }, { applicants: applicantsData }, { new: true }).exec();
        res.status(204).send();

    } catch (error) {
        res.status(500).send(error);
    }
};