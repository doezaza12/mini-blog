"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
const data_access_1 = require("./data-access");
class cardDAL {
    getCardById(cardId) {
        return new Promise(async (resolve, reject) => {
            try {
                let card = await data_access_1.DAL.mongoConnector.collection('card').findOne({
                    _id: Mongoose.Types.ObjectId(cardId)
                });
                if (card)
                    resolve(card);
                else
                    resolve(null);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    createCard(cardInfo) {
        return new Promise(async (resolve, reject) => {
            try {
                let card = await data_access_1.DAL.mongoConnector.collection('card').insertOne(cardInfo);
                if (card)
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
    editCard(cardId, cardInfo) {
        return new Promise(async (resolve, reject) => {
            try {
                // prevent not change field to be updated.
                let beforeUpdateCard = {};
                cardInfo ? beforeUpdateCard.name = cardInfo.name : '';
                cardInfo ? beforeUpdateCard.content = cardInfo.content : '';
                cardInfo ? beforeUpdateCard.category = cardInfo.category : '';
                cardInfo ? beforeUpdateCard.status = cardInfo.status : '';
                let card = await data_access_1.DAL.mongoConnector.collection('card').updateOne({
                    _id: Mongoose.Types.ObjectId(cardId)
                }, { '$set': beforeUpdateCard });
                if (card)
                    resolve(true);
                resolve(false);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    deleteCard(cardId) {
        return new Promise(async (resolve, reject) => {
            try {
                let card = await data_access_1.DAL.mongoConnector.collection('card').deleteOne({
                    _id: Mongoose.Types.ObjectId(cardId)
                });
                if (card)
                    resolve(true);
                resolve(false);
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    getCards() {
        return new Promise(async (resolve, reject) => {
            try {
                data_access_1.DAL.mongoConnector.collection('card').find().toArray(async (err, result) => {
                    if (err)
                        console.error(err);
                    if (result.length == 0)
                        resolve({ data: null });
                    resolve({ data: result });
                });
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
}
exports.cardDAL = cardDAL;
//# sourceMappingURL=card.js.map