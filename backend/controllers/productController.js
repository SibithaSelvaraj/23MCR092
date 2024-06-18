const { Product } = require('../models/productModel');

exports.addProduct = async (req, res, next) => {
    const { name, description, price, img, company, category, rating, discount, availability } = req.body; //body-frontend
    const newProduct = new Product({
        name, description, price, img, company, category, rating, discount, availability
    });
    if (name && description && price && img && company && category && rating && discount && availability) {
        const addedProduct = await newProduct.save();
        res.json(addedProduct);
        // res.json({"message":"success",addedProduct})
    } else {
        res.status(400).json({ message: "All fields are required" });
    }
}

exports.getProduct = async (req, res, next) => {
    const { companyname, categoryname } = req.params;
    const { top, minPrice, maxPrice } = req.query;

    try {
        const products = await Product.find({
            company: companyname,
            category: categoryname,
            price: { $gte: minPrice, $lte: maxPrice }
        })
        .sort({ rating: -1 })
        .limit(parseInt(top));

        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
