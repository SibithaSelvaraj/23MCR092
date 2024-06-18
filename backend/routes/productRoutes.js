const express = require("express");
const { addProduct, getProduct } = require("../controllers/productController");
const router = express.Router();

router.route('/addProduct').post(addProduct);
router.route('/companies/:companyname/categories/:categoryname/products').get(getProduct);

module.exports = router;
