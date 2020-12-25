import * as Mongoose from 'mongoose';
import { DAL } from './data-access';
import { CardAttributes } from '../card';

export class cardDAL {
    getCardById(cardId: string) {
        return new Promise<any>(async (resolve, reject) => {
            try {
                let card = await DAL.mongoConnector.collection('card').findOne({
                    _id: Mongoose.Types.ObjectId(cardId)
                });
                if (card) resolve(card);
                else resolve(null);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    createCard(cardInfo: CardAttributes) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                let card = await DAL.mongoConnector.collection('card').insertOne(cardInfo);
                if (card) resolve(true);
                else resolve(false);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    editCard(cardId: string, cardInfo: CardAttributes) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                // prevent not change field to be updated.
                let beforeUpdateCard = {} as CardAttributes;
                cardInfo ? beforeUpdateCard.name = cardInfo.name : '';
                cardInfo ? beforeUpdateCard.content = cardInfo.content : '';
                cardInfo ? beforeUpdateCard.category = cardInfo.category : '';
                cardInfo ? beforeUpdateCard.status = cardInfo.status : '';
                let card = await DAL.mongoConnector.collection('card').updateOne({
                    _id: Mongoose.Types.ObjectId(cardId)
                }, { '$set': beforeUpdateCard });
                if (card) resolve(true);
                resolve(false);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    deleteCard(cardId: string) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                let card = await DAL.mongoConnector.collection('card').deleteOne({
                    _id: Mongoose.Types.ObjectId(cardId)
                })
                if (card) resolve(true);
                resolve(false);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getCards() {
        return new Promise<any>(async (resolve, reject) => {
            try {
                DAL.mongoConnector.collection('card').find().toArray(async (err, result) => {
                    if (err) console.error(err);
                    if (result.length == 0) resolve({ data: null });
                    resolve({ data: result });
                });
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
}
