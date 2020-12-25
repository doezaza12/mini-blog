"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_access_1 = require("./data-access");
class userDAL {
    getUserByUsername(username) {
        return new Promise(async (resolve, reject) => {
            try {
                let user = await data_access_1.DAL.mongoConnector.collection('user').findOne({ username: username });
                if (user)
                    resolve(user);
                else
                    resolve(null);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    createUser(userInfo) {
        return new Promise(async (resolve, reject) => {
            try {
                let user = await data_access_1.DAL.mongoConnector.collection('user').insertOne(userInfo);
                if (user)
                    resolve(true);
                else
                    resolve(false);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
}
exports.userDAL = userDAL;
//# sourceMappingURL=user.js.map