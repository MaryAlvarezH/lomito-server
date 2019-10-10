const AuthRoutes = require('../AuthRoutes');
const UsersRoutes = require('../UserRoutes');

module.exports = (app) => {
    app.use('/api/auth', new AuthRoutes().routes);
    app.use('/api/users', new UsersRoutes().routes);
};