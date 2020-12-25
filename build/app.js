"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const data_access_1 = require("./models/data-access/data-access");
const config_1 = require("./config");
const routes_1 = require("./routes/routes");
const app = express();
// use for extract body from request
app.use(bodyParser.urlencoded({ extended: false }));
// statically init config and data access list
new config_1.Configuration('./config.json');
new data_access_1.DAL();
app.use(routes_1.router);
app.listen(8080, () => {
    console.log('listening 8080');
});
//# sourceMappingURL=app.js.map