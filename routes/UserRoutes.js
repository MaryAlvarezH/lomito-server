const userController = require('../controllers/user');
const { Router } = require('express');

const router = Router();

class UserRoutes {
    get routes() {
        router.get('/me', userController.me);
        router.put('/update-info', userController.updateInfo);
        router.put('/update-password', userController.updatePassword);
        router.post('/disable-account/:id', userController.disableAccount);
        router.get('/all-users', userController.getAll);
        return router;
    }
}

module.exports = UserRoutes;