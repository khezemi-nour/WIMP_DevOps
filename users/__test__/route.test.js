const request = require("supertest");
const app = require("../app");

describe("Test the root path to make sure its running fine", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe('POST /users', () => {
  test('creates a new user', async () => {
    const user = { name: 'Alice', email: 'alice@example.com' };
    const response = await request(app)
      .post('/users')
      .send(user)
      .expect(201);

    expect(response.body).toMatchObject(user);
    expect(users).toContainEqual(user);
  });
});