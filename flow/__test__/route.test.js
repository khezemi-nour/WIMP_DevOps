const request = require("supertest");
const { app }  = require("../app");
const { connect, clearAllCollections, close } = require('./db.test');

beforeEach(async () => {
  await connect();
  await clearAllCollections();
});

afterAll(async () => {
  await clearAllCollections();
  await close();
});

describe("Test the root path to make sure its running fine", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
