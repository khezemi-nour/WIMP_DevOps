const express = require('express');
let app = express();
let RED = require("node-red");
let http = require('http');
const flowRouter = require("./routes/route.config");

const bodyParser = require('body-parser');

var server = http.createServer(app);
// Create the settings object - see default settings.js file for other options
var settings = {
    httpAdminRoot:"/red",
    httpNodeRoot: "/api",
    httpNodeCors: true,
    userDir:"/home/nol/.nodered/",
    functionGlobalContext: { 
        os:require('os')
    }    // enables global context
};
// Initialise the runtime with a server and settings
RED.init(server,settings);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot, RED.httpAdmin);
flowRouter.routesConfig(app);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot,RED.httpNode);
app.use(bodyParser.json());
app.get("/", (_req, res) => {
    res.status(200).send("is runnning");
  });

module.exports = { app, RED ,server };