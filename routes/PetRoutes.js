const petController = require('../controllers/pet');
const { Router } = require('express');

const router = Router();

class PetRoutes {
    get routes() {
        router.get('/all', petController.allPetsToAdopt);
        router.get('/details/:id', petController.petDetails);
        router.post('/add-pet', petController.addPet);
        router.put('/update-pet', petController.updatePet);
        router.post('/set-status', petController.changePetStatus);
        return router;
    }
}

module.exports = PetRoutes;