const IdentityModel = require("../models/identity.model");
const crypto = require("crypto");

exports.insert = async (req, res) => {
  let salt = crypto.randomBytes(16).toString("base64");
  let hash = crypto
    .scryptSync(req.body.password, salt, 64, { N: 16384 })
    .toString("base64");
  req.body.password = salt + "$" + hash;
  //req.body.permissionLevel = 1;
  IdentityModel.createIdentity(req.body).then((result) => {
    res.status(201).send({ id: result._id });
  });
};
