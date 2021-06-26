import { MongoClient } from "mongodb";

const URI = "mongodb://localhost:27017/restaurants?retryWrites=true&w=majority";
const DB_NAME = 'menu-api'
const COLLECTION_NAME = 'restaurants';
const client = new MongoClient(URI);

export const startMongo = async () => {
   
    await client.connect();
}

export const stopMongo = async () => {
    await client.close();
}

export const getRestaurantFromDB = async id => {
    const restaurant = await client.db(DB_NAME).collection(COLLECTION_NAME).findOne({ _id: id });

    return restaurant;
}

export const getRestaurantsFromDB = async showOnlyWithMenus => {
    let query = {};
    if(showOnlyWithMenus)
        query = {
            $where: "this.menus.length > 0"
        };

    const restaurants = await client.db(DB_NAME).collection(COLLECTION_NAME).find(query).toArray();

    return restaurants;
}

export const updateRestaurant = async restaurant => {

    console.log('RESTAURANT:::', restaurant)
    await client.db(DB_NAME).collection(COLLECTION_NAME).updateOne({  _id: restaurant._id }, { $set: restaurant });
}

export default {
    startMongo,
    stopMongo,
    getRestaurantFromDB,
    getRestaurantsFromDB,
    updateRestaurant
}