import * as express from 'express';
import * as UserAccessController from '../controllers/access';
import * as CardController from '../controllers/card';
import * as Middleware from '../middlewares/auth';

// init router for recieve request from client
const router = express.Router();

// route that use for access API
router.post('/register', UserAccessController.register);
router.post('/login', UserAccessController.login);

// route that use for specific purpose
router.post('/card/create', Middleware.authentication, CardController.createCard);
router.post('/card/edit', Middleware.authentication, CardController.editCard);
router.post('/card/delete', Middleware.authentication, CardController.deleteCard);

// route that use for get all cards in database
router.get('/cards', CardController.getCards)

export { router }