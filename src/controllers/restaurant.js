import { getFile, getAllFiles } from '../helpers/fileHelper';

const PAGE_SIZE = 10;

const filterRestaurants = (restaurants, showOnlyWithMenus) => {
    return restaurants.filter(item => {
        if(!showOnlyWithMenus) return true;
        return item.menus.length;
    })
}

export const getRestaurants = (req, res) => {
    try {
        if(req.params.id) {
            const restaurant = getFile(`${req.params.id}.json`);
            if(!restaurant)
                return res.status(404).send('Restaurant not found');
            
            return res.send(restaurant);
        }

        const page = parseInt(req.query.page || 1);
        let restaurants = getAllFiles();

        if(req.query.showOnlyWithMenu) {
            restaurants = filterRestaurants(restaurants, req.query.showOnlyWithMenu);
        }
        
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