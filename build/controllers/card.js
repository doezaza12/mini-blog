"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status-codes");
const data_access_1 = require("../models/data-access/data-access");
async function createCard(req, res, next) {
    try {
        // pre define card attributes
        // prevent user doesnt give any info by set empty string as default
        let card = {};
        card.name = req.body.name ? req.body.name : '';
        card.content = req.body.content ? req.body.content : '';
        card.category = req.body.category ? req.body.category : '';
        card.status = req.body.status ? req.body.status : '';
        // automatically read username from token
        card.author = req['payload'].username;
        // create card
        let result = await data_access_1.DAL.cardDAL.createCard(card);
        if (result)
            return res.status(HttpStatus.StatusCodes.CREATED).send('Successfully created card.');
        else
            return res.status(HttpStatus.StatusCodes.CONFLICT).send('Cannot create card.');
    }
    catch (err) {
        console.error(err);
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
}
exports.createCard = createCard;
async function editCard(req, res, next) {
    try {
        // prevent user send request without refer cardId
        let cardId = req.body.cardId;
        if (!cardId)
            return res.status(HttpStatus.StatusCodes.NOT_ACCEPTABLE).send('Please refer cardId.');
        // prevent card that refers by cardId is not found
        let existCard = await data_access_1.DAL.cardDAL.getCardById(cardId);
        if (!existCard)
            return res.status(HttpStatus.StatusCodes.NOT_FOUND).send('The cardId is not found.');
        // check if refered card is not own by the request user
        if (existCard.author != req['payload'].username)
            return res.status(HttpStatus.StatusCodes.UNAUTHORIZED).send('No permission.');
        let card = {};
        // undefined, null and empty string can happen so lets set null as default
        card.name = req.body.name ? req.body.name : null;
        card.content = req.body.content ? req.body.content : null;
        card.category = req.body.category ? req.body.catagory : null;
        card.status = req.body.status ? req.body.status : null;
        // edit card
        let result = await data_access_1.DAL.cardDAL.editCard(cardId, card);
        if (result)
            return res.status(HttpStatus.StatusCodes.OK).send('Successfully edited card.');
        else
            return res.status(HttpStatus.StatusCodes.CONFLICT).send('Cannot edit card.');
    }
    catch (err) {
        console.error(err);
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
}
exports.editCard = editCard;
async function deleteCard(req, res, next) {
    try {
        // prevent user send request without refer cardId
        let cardId = req.body.cardId;
        if (!cardId)
            return res.status(HttpStatus.StatusCodes.NOT_ACCEPTABLE).send('Please refer cardId.');
        // prevent card that refers by cardId is not found
        let existCard = await data_access_1.DAL.cardDAL.getCardById(cardId);
        if (!existCard)
            return res.status(HttpStatus.StatusCodes.NOT_FOUND).send('The cardId is not found.');
        // check if refered card is not own by the request user
        if (existCard.author != req['payload'].username)
            res.status(HttpStatus.StatusCodes.UNAUTHORIZED).send('No permission.');
        // delete card
        let result = await data_access_1.DAL.cardDAL.deleteCard(cardId);
        if (result)
            return res.status(HttpStatus.StatusCodes.OK).send('Successfully deleted card.');
        else
            return res.status(HttpStatus.StatusCodes.CONFLICT).send('Cannot delete card.');
    }
    catch (err) {
        console.error(err);
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
}
exports.deleteCard = deleteCard;
async function getCards(req, res, next) {
    try {
        // get card list for convenient test the others route
        let cards = await data_access_1.DAL.cardDAL.getCards();
        res.status(HttpStatus.StatusCodes.OK).send(cards);
    }
    catch (err) {
        console.error(err);
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
}
exports.getCards = getCards;
//# sourceMappingURL=card.js.map