import { getRestaurantFromDB, getRestaurantsFromDB} from '../helpers/mongoHelper';

const PAGE_SIZE = 10;

export const getRestaurants = async (req, res) => {
    try {
        if(req.params.id) {
            const restaurant = await getRestaurantFromDB(parseInt(req.params.id));
            if(!restaurant)
                return res.status(404).send('Restaurant not found');
            
            return res.send(restaurant);
        }

        const page = parseInt(req.query.page || 1);
        const restaurants = await getRestaurantsFromDB(req.query.showOnlyWithMenu);

        return res.send({
            totalPages: Math.ceil(restaurants.length / PAGE_SIZE),
            page,
            results: restaurants.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
        });
    }catch(err) {
        console.log(err);
        return res.status(500).send();
    }
}

export default {
    getRestaurants
}