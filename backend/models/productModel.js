const mongoose = require("mongoose");
//schema 👇
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    availability: {
        type: String,
        required: true
    }
});
//creating model using schema👇
exports.Product = mongoose.model('Product', productSchema);
