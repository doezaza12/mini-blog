"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
const config_1 = require("../config");
//  DAL stand for Data Access List
class DAL {
    constructor() {
        try {
            DAL.mongoConnector = Mongoose.createConnection(config_1.Configuration.mongo.uri, { useNewUrlParser: true, useUnifiedTopology: true });
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.DAL = DAL;
//# sourceMappingURL=data-access.js.map