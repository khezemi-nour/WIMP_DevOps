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
describe("POST/flow", () => {
  test("creates a new user", async () => {
    const flow  = {
      "flowData": [
          {
              "id": "278fa0eb.43aed8",
              "type": "function",
              "name": "broker def node",
              "func": "// pass in: msg.parameters.broker\n\nnode_type = \"mqtt-broker\";\nmsg.id = msg.id + 1;\n\nmsg.payload.push({\n        id: msg.id,\n        type: node_type,\n        broker: msg.parameters.broker,\n        port: \"1883\"\n      });\n\n// store the broker def ID so we can refer to it in the output node\nmsg.defs = {broker: msg.id,\n \t\t\t// how far apart are nodes horizontally\n     \t \tspacing: 150}; \n\n\nreturn msg;",
              "outputs": 1,
              "x": 441,
              "y": 191,
              "z": "911370d8.e61a48",
              "wires": [
                  [
                      "15e5103c.e73b7"
                  ]
              ]
          },
          {
              "id": "da8f9fca.854188",
              "type": "inject",
              "name": "parameters",
              "topic": "",
              "payload": "{\"broker\":\"localhost\",\"input\":\"source_topic\",\"output\":\"destination_topic\",\"process\":\"msg.payload = \\\"* \\\"+msg.payload+\\\" *\\\";\\nreturn msg;\"}",
              "repeat": "",
              "crontab": "",
              "once": false,
              "x": 150,
              "y": 131,
              "z": "911370d8.e61a48",
              "wires": [
                  [
                      "50abf75f.4e47f8"
                  ]
              ]
          },
          {
              "id": "50abf75f.4e47f8",
              "type": "function",
              "name": "initialise",
              "func": "// create the parameters object from the incoming JSON object\nconsole.log(msg.payload);\nmsg.parameters = JSON.parse(msg.payload);\n\n// we're going to create an array of objects\nmsg.payload = [];\nmsg.id = 0;\n\nreturn msg;",
              "outputs": 1,
              "x": 292,
              "y": 131,
              "z": "911370d8.e61a48",
              "wires": [
                  [
                      "278fa0eb.43aed8"
                  ]
              ]
          },
          {
              "id": "15e5103c.e73b7",
              "type": "function",
              "name": "MQTT in node",
              "func": "// pass in msg.parameters.input\n\nnode_type = \"mqtt in\";\nprevious_id = msg.id;\n\nmsg.id = msg.id + 1;\n\nmsg.payload.push({\n        id: msg.id,\n        type: node_type,\n        topic: msg.parameters.input,\n        broker: msg.defs.broker,\n        name: \"input\",\n\t\tx: 100,\n\t\ty: 100,\n\t\twires: []\n      });\n\nreturn msg;",
              "outputs": 1,
              "x": 461,
              "y": 235,
              "z": "911370d8.e61a48",
              "wires": [
                  [
                      "5231e2ad.f01a3c"
                  ]
              ]
          },
          {
              "id": "5231e2ad.f01a3c",
              "type": "function",
              "name": "function node",
              "func": "// pass in msg.parameters.process\n\nnode_type = \"function\";\nprevious_id = msg.id;\n\nmsg.id = msg.id + 1;\n\n// fill in the wires link in previous node\nmsg.payload[msg.payload.length-1].wires.push([msg.id]);\nnew_x = msg.payload[msg.payload.length-1].x + msg.defs.spacing;\nnew_y = msg.payload[msg.payload.length-1].y;\n\nmsg.payload.push({\n        id: msg.id,\n        type: node_type,\n        name: \"process\",\n        func: msg.parameters.process,\n        outputs: 1,\n\t\tx: new_x,\n\t\ty: new_y,\n\t\twires: []\n      });\n\nreturn msg;",
              "outputs": 1,
              "x": 486,
              "y": 279,
              "z": "911370d8.e61a48",
              "wires": [
                  [
                      "8cf45583.109bf8"
                  ]
              ]
          },
          {
              "id": "8cf45583.109bf8",
              "type": "function",
              "name": "MQTT out node",
              "func": "// pass in msg.parameters.output\n \t\t   \n\nnode_type = \"mqtt out\";\nprevious_id = msg.id;\n\nmsg.id = msg.id + 1;\n\n// fill in the wires link in previous node\nmsg.payload[msg.payload.length-1].wires.push([msg.id]);\nnew_x = msg.payload[msg.payload.length-1].x + msg.defs.spacing;\nnew_y = msg.payload[msg.payload.length-1].y;\n\n\nmsg.payload.push({\n        id: msg.id,\n        type: node_type,\n        topic: msg.parameters.output,\n        broker: msg.defs.broker,\n        name: \"output\",\n\t\tx: new_x,\n\t\ty: new_y,\n\t\twires: []\n      });\n\nreturn msg;",
              "outputs": 1,
              "x": 515,
              "y": 326,
              "z": "911370d8.e61a48",
              "wires": [
                  [
                      "a3f81690.493398"
                  ]
              ]
          },
          {
              "id": "a3f81690.493398",
              "type": "debug",
              "name": "",
              "active": true,
              "complete": "false",
              "x": 673,
              "y": 326,
              "z": "911370d8.e61a48",
              "wires": []
          },
          {
              "id": "485c51ed.6013b8",
              "type": "comment",
              "name": "generate \"mqtt - process - mqtt\" flow",
              "info": "publish  to \"configure\" topic:\n\n{\n  \"broker\":\"localhost\",\n  \"input\":\"source_topic\",\n  \"output\":\"destination_topic\",\n  \"process\":\"msg.payload = \\\"* \\\"+msg.payload+\\\" *\\\";\\nreturn msg;\"\n}",
              "x": 199,
              "y": 73,
              "z": "911370d8.e61a48",
              "wires": []
          }
      ]
  }
    await request(app).get('/clear');
    await request(app).post("/flow").send(flow).expect(201);
    


});
});