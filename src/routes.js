import express from 'express';
import restaurantController from './controllers/restaurant';

const app = express();

app.get('/', (req, res) => {
    res.send({
        status: 200,
        message: 'up and running!'
    })
})

app.get('/restaurants/:id?', restaurantController.getRestaurants);

export default app;