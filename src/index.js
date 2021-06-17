import express from 'express';
import { urlencoded, json } from 'body-parser';
import routes from './routes';

const PORT = 9000;
const app = express();

app.use(urlencoded({ extended: false }))
app.use(json())
app.use(routes);

app.listen(PORT, () => {
    console.log('up and running!');
})