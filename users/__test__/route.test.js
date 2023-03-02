const request = require("supertest");
const app = require("../app");
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

describe("POST /users", () => {
  test("creates a new user", async () => {
    const user = {
      firstName: "admin",
      lastName: "admin",
      userName: "admin",
      password: "admin",
      permissionLevel: 1,
    };
    const response = await request(app).post("/users").send(user).expect(201);

    expect(response.body).toHaveProperty('id')  
  });
});

describe("GET /users", () => {
  test("GET a new user", async () => {
    
    const response = await request(app).get("/users").expect(200);

  
  });
});

describe("GET /usersbyid", () => {
  test("GET a new user by id", async () => {

    
    const user = {
      firstName: "admin",
      lastName: "admin",
      userName: "admin",
      password: "admin",
      permissionLevel: 1,
    };
    const response = await request(app).post("/users").send(user).expect(201);
      
    const rp = await request(app).get( `/users/${response.body.id}`).expect(200);

  
  });
});
describe("put/usersbyid", () => {
  test("update user by id", async () => {

    
    const user = {
      firstName: "admin",
      lastName: "admin",
      userName: "admin",
      password: "admin",
      permissionLevel: 1,
    };
    const response = await request(app).post("/users").send(user).expect(201);
      
    const rp = await request(app).put( `/users/${response.body.id}`).send({firstName:"Name2"}).expect(204);

  
  });
});

describe("delete/usersbyid", () => {
  test("delete user by id", async () => {

    
    const user = {
      firstName: "admin",
      lastName: "admin",
      userName: "admin",
      password: "admin",
      permissionLevel: 1,
    };
    const response = await request(app).post("/users").send(user).expect(201);
      
    const rp = await request(app).delete( `/users/${response.body.id}`).expect(204);

  
  });
});

describe("POST/auth", () => {
  test("creates a new user", async () => {
    const user = {
      firstName: "admin2",
      lastName: "admin2",
      userName: "admin2",
      password: "admin2",
      permissionLevel: 1,
    };
    const resp = await request(app).post("/users").send(user).expect(201);
    const response = await request(app).post("/auth").send({
      username : 'admin2',
      password : 'admin2'
    }).expect(201);

    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken') 
  });
});


