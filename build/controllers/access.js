"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config_1 = require("../config");
const data_access_1 = require("../models/data-access/data-access");
const user_1 = require("../models/user");
// the function use to generate jwt
function tokenGenerator(username) {
    //  add field 'username' into token for validate author, the token has 1h life time
    return jwt.sign({ username: username }, config_1.Configuration.token.secret, {
        expiresIn: '1h'
    });
}
async function register(req, res, next) {
    try {
        // check if the username has already created.
        let isUserCreated = await data_access_1.DAL.userDAL.getUserByUsername(req.body.username);
        if (isUserCreated)
            return res.status(HttpStatus.StatusCodes.OK).send('Duplicate username.');
        // pre define user attribute
        let user = new user_1.UserAttributes();
        user.username = req.body.username;
        user.password = await new Promise((resolve, reject) => {
            // hash password using bcrypt that extend password with username for encrypt
            // use salt generates round as 10 (more rounds more secure trade-off performance)
            bcrypt.hash(req.body.password + req.body.username, 10, async function (err, hash) {
                if (err)
                    reject(err);
                resolve(hash);
            });
        });
        // create user
        await data_access_1.DAL.userDAL.createUser(user);
        return res.status(HttpStatus.StatusCodes.OK).send('Successfully create user.');
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
}
exports.register = register;
async function login(req, res, next) {
    try {
        // prevent compute when user doesn't sent password or username
        if (!req.body.password || !req.body.username)
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).send('Require username or password.');
        // get user info by username
        let user = await data_access_1.DAL.userDAL.getUserByUsername(req.body.username);
        if (user)
            bcrypt.compare(req.body.password + req.body.username, user.password, (err, same) => {
                if (err)
                    return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send();
                if (same) {
                    console.log(user._id);
                    // if the username and password are correct then generate token for the user
                    return res.status(HttpStatus.StatusCodes.OK).send({ token: tokenGenerator(user.username) });
                }
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send('Username or password is invalid.');
            });
        else
            return res.status(HttpStatus.StatusCodes.NOT_FOUND).send('Unknown username.');
    }
    catch (err) {
        console.error(err);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
}
exports.login = login;
//# sourceMappingURL=access.js.map