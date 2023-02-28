
const IdentityProvider = require("./controllers/identity.provider");

exports.routesConfig = (app) => {
    app.post('/users', [
        IdentityProvider.insert
    ]);
    
};