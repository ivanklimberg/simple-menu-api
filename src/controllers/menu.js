import remove from 'lodash/remove';
import { getRestaurantFromDB, updateRestaurant } from '../helpers/mongoHelper';

const validateMenu = menu =>
    menu && 
    (menu.id && typeof menu.id === 'number') &&
    menu.name &&
    (menu.dishes && typeof menu.dishes === 'object')


export const putMenu = async (req, res) => {
    try {
        const {
            id,
            menuId
        } = req.params;
        
        const restaurant = await getRestaurantFromDB(parseInt(id));
        if(!restaurant){
            return res.status(404).send('Restaurant not found');
        }

        const menu = restaurant.menus.find(r =>
            r.id === parseInt(menuId));
        if(!menu){
            return res.status(404).send('Menu not found')
        }
        
        if(!req.body.menu || !validateMenu(req.body.menu)) {
            return res.status(400).send({
                success: false,
                message: 'The menu is missing required fields. Required fields are id (number), name and dishes (array)'
            })
        }

        remove(restaurant.menus, m => m.id === parseInt(menuId));
        restaurant.menus.push(req.body.menu)

        updateRestaurant(restaurant)

        res.send({
            success: true,
            message: 'Menu updated!'
        })
    }catch(err) {
        console.log(err);
        res.status(500).send();
    }
}

export default {
    putMenu
}