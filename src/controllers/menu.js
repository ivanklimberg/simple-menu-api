import { getFile, writeFile } from '../helpers/fileHelper';

export const putMenu = (req, res) => {
    try {
        const {
            id,
            menuId
        } = req.params;

        const restaurant = getFile(`${id}.json`);
        const menu = restaurant.menus.find(r =>
            r.id === parseInt(menuId));
        
        if(!menu){
            return res.status(404).send('Menu not found')
        }
        
        

        
    }catch(err) {
        console.log(err);
        res.status(500).send();
    }
}

export default {
    putMenu
}