// const IdentityProvider = require('./controllers/identity.provider');
//const config = require('../env.config');
const IdentityProvider = require('./controllers/indentity.provider');

exports.routesConfig = (app) => {
    app.post('/users', [
        IdentityProvider.insert
    ]);
    
};