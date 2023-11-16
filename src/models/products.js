import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "Products";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnail: {
        type: Array,
        default: ["Sin imagenes"]
    }
})

schema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(collection, schema);