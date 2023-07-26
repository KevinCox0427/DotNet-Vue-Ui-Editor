import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./dist/public'));


import indexRoute from './controllers/index';

app.use('/', indexRoute);

app.listen(process.env.PORT || 3000, () => console.log('Listening!'));