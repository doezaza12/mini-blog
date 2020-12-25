"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class Configuration {
    constructor(path) {
        try {
            // read json config
            let config = JSON.parse(fs.readFileSync(path, { encoding: 'utf8' }));
            Configuration.token = new TokenConfig();
            Configuration.token.secret = config.token.secret;
            Configuration.mongo = new MongoConfig();
            Configuration.mongo.uri = config.mongo.uri;
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.Configuration = Configuration;
//  define for typescript compiler
class TokenConfig {
}
class MongoConfig {
}
//# sourceMappingURL=config.js.map