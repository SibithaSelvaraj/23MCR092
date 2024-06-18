const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productroute = require("./routes/productRoutes");
const app = express();
require('dotenv').config();

app.use(cors()); // use-middleware (cors is also a middleware)
app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log(`Running on port ${process.env.PORT}`);
});

const mongoUrl = process.env.MONGOURL;
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.log(err);
});

app.use('/api', productroute);
