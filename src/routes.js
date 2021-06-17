import express from 'express';
import restaurantController from './controllers/restaurant';
import menuController from './controllers/menu';

const app = express();

app.get('/', (req, res) => {
    res.send({
        status: 200,
        message: 'up and running!'
    })
})

app.get('/restaurants/:id?', restaurantController.getRestaurants);

app.put('/restaurants/:id/menus/:menuId', menuController.putMenu)

export default app;