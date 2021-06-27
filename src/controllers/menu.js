import remove from 'lodash/remove';
import MenuModel from '../models/menuModel';
import { getRestaurantFromDB, updateRestaurant } from '../helpers/mongoHelper';

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
        
        const model = new MenuModel(req.body.menu);
        const error = model.validateSync();

        if(error && error.errors) {
            return res.status(400).send({
                success: false,
                errors: error.errors
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