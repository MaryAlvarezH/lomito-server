const authController = require('../controllers/auth');
const { Router } = require('express');

const router = Router();

class AuthRoutes {
    get routes() {
        router.post('/signup', authController.signUp);
        router.post('/login', authController.login);
        return router;
    }
}

module.exports = AuthRoutes;