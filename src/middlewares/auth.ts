import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import * as jwt from 'jsonwebtoken';

import { Configuration } from '../config';

export function authentication(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let header = req.headers.authorization.split(' ')[0];
        let token = req.headers.authorization.split(' ')[1];
        if (header == 'Bearer') {
            jwt.verify(token, Configuration.token.secret, async (err, payload) => {
                if (err) return res.status(HttpStatus.StatusCodes.UNAUTHORIZED).send('Your token is expired.');
                req['payload'] = payload;
                next();
            });
        }
        else {
            return res.status(HttpStatus.StatusCodes.EXPECTATION_FAILED).send('Make sure you use token bearer.');
        }
    } catch (err) {
        console.error(err);
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
}
