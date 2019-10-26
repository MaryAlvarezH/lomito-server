const userController = require('../controllers/user');
const passportJWT = require('../middlewares/passportJWT')()
const { Router } = require('express');

const router = Router();

class UserRoutes {
    get routes() {
        router.get('/me', passportJWT.authenticate(), userController.me);
        router.put('/update-info', userController.updateInfo);
        router.put('/update-password', userController.updatePassword);
        router.post('/disable-account/:id', userController.disableAccount);
        router.get('/all-users', userController.getAll);
        return router;
    }
}

module.exports = UserRoutes;