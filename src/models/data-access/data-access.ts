import * as Mongoose from 'mongoose';

import { Configuration } from '../../config';
import { userDAL } from '../data-access/user';
import { cardDAL } from './card';

//  DAL stand for Data Access List
export class DAL {
    static mongoConnector: Mongoose.Connection;
    static userDAL: userDAL;
    static cardDAL: cardDAL;

    constructor() {
        try {
            // create mongo connection using uri
            DAL.mongoConnector = Mongoose.createConnection(Configuration.mongo.uri,
                { useNewUrlParser: true, useUnifiedTopology: true })
            DAL.userDAL = new userDAL();
            DAL.cardDAL = new cardDAL();
        }
        catch (err) {
            console.log(err)
        }
    }
}