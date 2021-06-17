import { getFile, getAllFiles } from '../helpers/fileHelper';

const PAGE_SIZE = 10;

export const getRestaurants = (req, res) => {
    try {
        if(req.params.id) {
            const restaurant = getFile(`${req.params.id}.json`);
            if(!restaurant)
                return res.status(404).send('Restaurant not found');
            
            return res.send(restaurant);
        }
        const page = parseInt(req.query.page || 1);
        const restaurants = getAllFiles();
    
        return res.send({
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