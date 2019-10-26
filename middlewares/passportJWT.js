const passport = require('passport');
const passportJWT = require('passport-jwt');
const UserModel = require('../models/user');
const config = require("../config/JWTSecret");


const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy; // Es la estrategia sobre el como se va a autenticar al usuario.
const params = {
    secretOrKey: config.JWTSecret,
    jwtFromRequest: ExtractJWT.fromHeader('authorization')
}

module.exports = () => {
    const strategy = new Strategy(params, async(payload, done) => {
        const user = await UserModel.findById(payload.id);
        if(!user) return done(new Error('user not found.'), null);
        return done(null, user);
    });
    passport.use(strategy);
    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', {session: false})
    };
};