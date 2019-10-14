const MainRoute = require('../MainRoute');
const AuthRoutes = require('../AuthRoutes');
const UsersRoutes = require('../UserRoutes');
const PetsRoutes = require('../PetRoutes');
const AdoptionRoutes = require('../AdoptionRoutes');

module.exports = (app) => {
    app.use('/', MainRoute);
    app.use('/api', MainRoute);
    app.use('/api/auth', new AuthRoutes().routes);
    app.use('/api/users', new UsersRoutes().routes);
    app.use('/api/pets', new PetsRoutes().routes);
    app.use('/api/adoption', new AdoptionRoutes().routes);
};