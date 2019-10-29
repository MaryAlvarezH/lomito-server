const AdoptionModel = require('../models/adoption');
const PetModel = require('../models/pet');
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

exports.getAddoptionByUserId = async(req, res) => {
    const ownerId = req.params.id;
    const adoption = await PetModel.aggregate([
        { $lookup: 
            {
                from: "adoptions",
                localField:"_id",
                foreignField: "petId",
                as: "adoption"
            }
        },
        { $lookup: 
            {
                from: "users",
                localField:"adoption.applicants.userId",
                foreignField: "_id",
                as: "applicants_details"
            }
        },
        { $match: 
            { 
                "ownerId" : ObjectId(ownerId),
                "status": "active"
            } 
        },
        { $project: 
            { 
                "petId": "$petId",
                "name": "$name",
                "status": "$status",
                "createdAt": "$createdAt",
                "imageURL": "$imageURL",
                "adoption": "$adoption.applicants",
                "applicants_details": "$applicants_details"
            }
        }
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
        const [applicantExist] = await AdoptionModel.find({'applicants.userId': ObjectId(newApplicant[0].userId), petId: ObjectId(petId)});

        if (adoption) {
            if (applicantExist) {
                return res.status(200).json({status:'error', message: 'applicant already exist'})
            } else {
                const applicantsData = adoption.applicants;
                const updatedApplicantList = [...applicantsData, ...newApplicantData];
                const adoptionModified = await AdoptionModel.findOneAndUpdate({ petId }, { applicants: updatedApplicantList }, { new: true }).exec();
                res.status(201).send(adoptionModified);
            }
        } else {
            const newAdoption = new AdoptionModel({
                petId: req.body.petId,
                applicants: newApplicantData
            });
            const adoptionSaved = await newAdoption.save();
            res.status(201).send(adoptionSaved);
        }
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