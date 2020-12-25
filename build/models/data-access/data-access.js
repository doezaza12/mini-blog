"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
const config_1 = require("../../config");
const user_1 = require("../data-access/user");
const card_1 = require("./card");
//  DAL stand for Data Access List
class DAL {
    constructor() {
        try {
            // create mongo connection using uri
            DAL.mongoConnector = Mongoose.createConnection(config_1.Configuration.mongo.uri, { useNewUrlParser: true, useUnifiedTopology: true });
            DAL.userDAL = new user_1.userDAL();
            DAL.cardDAL = new card_1.cardDAL();
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.DAL = DAL;
//# sourceMappingURL=data-access.js.map