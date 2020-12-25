"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status-codes");
const jwt = require("jsonwebtoken");
const config_1 = require("../config");
function authentication(req, res, next) {
    try {
        let header = req.headers.authorization.split(' ')[0];
        let token = req.headers.authorization.split(' ')[1];
        if (header == 'Bearer') {
            jwt.verify(token, config_1.Configuration.token.secret, async (err, payload) => {
                if (err)
                    return res.status(HttpStatus.StatusCodes.UNAUTHORIZED).send('Your token is expired.');
                req['payload'] = payload;
                next();
            });
        }
        else {
            return res.status(HttpStatus.StatusCodes.EXPECTATION_FAILED).send('Make sure you use token bearer.');
        }
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
}
exports.authentication = authentication;
//# sourceMappingURL=auth.js.map