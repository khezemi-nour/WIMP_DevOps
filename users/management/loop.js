const IdentityModel = require("../routes/models/identity.model");
const config = require("../security/env.config");
const Surfer = config.permissionLevels.Surfer;
const Master = config.permissionLevels.Master;
const request = require("supertest");
const { createProcessGRPCClient } = require("../routes/communication/client");

exports.AdminInit = async (app) => {
  const userAdmin = {
    firstName: "admin",
    lastName: "admin",
    userName: "admin",
    password: "adminpass",
    permissionLevel: Master,
  };
  const userList = await IdentityModel.list(0, 100);
  if (userList.filter((o) => o.firstName === "admin").length == 0) {
    await request(app)
      .post("/users")
      .send(userAdmin)
      .then(() => {
        console.log("admin created with success");
      });
  }
  console.log("admin already created in Database");
};

// Loop module
exports.flow = async () => {
  try {
    while (true) {
      // Fetch data from the database
      const userList = await IdentityModel.list(0, 100);
      userList.forEach((user) => {
        if (
          user.isActive &&
          user.permissionLevel === Surfer &&
          user.noderedInstance === null
        ) {
          // If user active and there's
          user.noderedIntance = createProcessGRPCClient(user._id);
          // Update Database
          IdentityModel.putIdentity(user._id, user);
        }
      });
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
