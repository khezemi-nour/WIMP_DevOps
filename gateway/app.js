import express from "express";
import { setupLogging } from "./utils/logging";
import { setupProxies } from "./utils/proxy";
import { setupAuthentication } from "./security/index.security";
import { routes } from "./routes/routes";
import { setupRateLimit } from './utils/rateLimit';
import { setupBodyParser } from "./utils/bodyparser";
const config = require('dotenv').config()

const app = express()
///enabling CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin',process.env.CORS );
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range,X-Auth');
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
      }
      else {
        next();
      }});

// Setting up the logging
setupLogging(app);
// Setting up the Authentication for the gateway
setupAuthentication(app,routes);
// Setting up the rate Limit for the gateway
setupRateLimit(app,routes);
// Setting up the Proxy
setupProxies(app,routes);
// Setting up the bodyParser for the specific endpoint
setupBodyParser(app,routes);

app.get("/", (_req, res) => {
    res.status(200).send("is runnning");

  });

export default app;