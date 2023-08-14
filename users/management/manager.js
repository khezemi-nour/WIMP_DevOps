const IdentityModel = require("../routes/models/identity.model");
const config = require("../security/env.config");
const Surfer = config.permissionLevels.Surfer;
const Master = config.permissionLevels.Master;
const request = require("supertest");
const { createNodeProcess } = require("../routes/communication/client");

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
      await new Promise((resolve) => setTimeout(resolve, 30000)); // Wait for 30 seconds
      // Fetch data from the database
      const userList = await IdentityModel.list(0, 100);
      userList.forEach((user) => {
        if (
          user.isActive &&
          user.permissionLevel === Surfer &&
          user.noderedInstance === null
        ) {
          // If user active and there's
          const result = createNodeProcess(user._id,  (data) => console.log(data)
          );
          console.log(result);
          user.noderedIntance = result.isRunning;
          // Update Database
          IdentityModel.putIdentity(user._id, user);
        }
      });
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
