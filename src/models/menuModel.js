import mongoose from 'mongoose';
const { Schema } = mongoose;

const dishSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true  }
})

const menuSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    dishes: [dishSchema]
})


export default mongoose.model('MenuModel', menuSchema);