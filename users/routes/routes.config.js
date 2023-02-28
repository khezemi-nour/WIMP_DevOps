
const IdentityProvider = require("./controllers/identity.provider");

exports.routesConfig = (app) => {
    app.post('/users', [
        IdentityProvider.insert
    ]);

    app.get('/users', [
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        IdentityProvider.list
    ]);
    app.get('/users/:userId', [
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        AuthorizationPermission.onlySameUserOrAdminCanDoThisAction,
        IdentityProvider.getById
    ]);
    
};