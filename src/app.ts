import * as express from 'express';
import * as bodyParser from 'body-parser';
import { DAL } from './models/data-access/data-access';
import { Configuration } from './config';
import { router } from './routes/routes'

const app = express();

// use for extract body from request
app.use(bodyParser.urlencoded({ extended: false }));

// statically init config and data access list
new Configuration('./config.json');
new DAL();

app.use(router);

app.listen(8080, () => {
    console.log('listening 8080');
})