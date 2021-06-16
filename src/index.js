import express from 'express';
import routes from './routes';

const PORT = 9000;
const app = express();

app.use(routes);

app.listen(PORT, () => {
    console.log('up and running!');
})