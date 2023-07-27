import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

// Our express app
const app = express();

// Loading some middlewares to parse incoming request data and open static routes.
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./dist/public'));

// Declaring our routes created in the controllers directory.
import indexRoute from './controllers/index';

app.use('/', indexRoute);

// Listening to port. 
app.listen(process.env.PORT || 3000, () => console.log('Listening!'));