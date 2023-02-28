
const IdentityProvider = require("./controllers/identity.provider");

exports.routesConfig = (app) => {
    app.post('/users', [
        IdentityProvider.insert
    ]);

    app.get('/users', [
        IdentityProvider.list
    ]);
    app.get('/users/:userId', [
        IdentityProvider.getById
    ]);
    
};