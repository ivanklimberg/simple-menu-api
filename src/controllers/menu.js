import { getFile, writeFile } from '../helpers/fileHelper';


const PAGE_SIZE = 10;

const getMenu = (req, res) => {
    const menuList = getFile(MENU_FILE);
    const { id } = req.params;
    
    return restaurantMenus

    if(!req.params.id) {
        return res.send({
            

        })
    }
}