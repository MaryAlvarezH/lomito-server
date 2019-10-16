const adoptionController = require('../controllers/adoption');
const { Router } = require('express');

const router = Router();

class AdoptionRoutes {
    get routes() {
        router.get('/all', adoptionController.getAllAdoptions);
        router.post('/create', adoptionController.create);
        router.get('/info/:id', adoptionController.getAddoptionByPetId);
        router.post('/add-applicant', adoptionController.addApplicant);
        router.post('/remove-applicant', adoptionController.removeApplication);
        return router;
    }
}

module.exports = AdoptionRoutes;