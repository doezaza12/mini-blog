import * as fs from 'fs';

export class Configuration {
    static token: TokenConfig;
    static mongo: MongoConfig;

    constructor(path: string) {
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

//  define for typescript compiler
class TokenConfig {
    secret: string;
}
class MongoConfig {
    uri: string;
}