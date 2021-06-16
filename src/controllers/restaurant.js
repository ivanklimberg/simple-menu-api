import { getFile, getAllFiles, writeFile } from '../helpers/fileHelper';

const PAGE_SIZE = 10;

export const getRestaurants = (req, res) => {
    if(req.params.id) {
        const restaurant = getFile(`${req.params.id}.json`);
        if(!restaurant)
            return res.status(404).send('Restaurant not found');
        
        return res.send(restaurant);
    }
    const page = parseInt(req.query.id || 1);
    const restaurants = getAllFiles();

    return res.send({
        page,
        results: restaurants.slice(page - 1, page * PAGE_SIZE)
    });
}

export default {
    getRestaurants
}