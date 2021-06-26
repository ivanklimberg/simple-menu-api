import 'babel-polyfill';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { urlencoded, json } from 'body-parser';
import routes from './routes';
import { startMongo, stopMongo } from './helpers/mongoHelper';

const PORT = 9000;
const app = express();

var corsOptions = {
    origin: 'http://localhost:3000'
}

app.use(cors(corsOptions));
app.use(urlencoded({ extended: false }))
app.use(json())
app.use(compression());
app.use(routes);

process.on('beforeExit', () => {
    stopMongo();
    console.log('app stopping')
})

app.listen(PORT, () => {
    startMongo();
    console.log('up and running!');
})