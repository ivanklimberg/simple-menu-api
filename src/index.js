import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { urlencoded, json } from 'body-parser';
import routes from './routes';

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



app.listen(PORT, () => {
    console.log('up and running!');
})