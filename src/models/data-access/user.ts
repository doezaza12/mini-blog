import { DAL } from './data-access'
import { UserAttributes } from '../user'

export class userDAL {
    getUserByUsername(username: string) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                let user = await DAL.mongoConnector.collection('user').findOne({ username: username });
                if (user) resolve(user);
                else resolve(null);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    createUser(userInfo: UserAttributes) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                let user = await DAL.mongoConnector.collection('user').insertOne(userInfo);
                if (user) resolve(true);
                else resolve(false);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
}
