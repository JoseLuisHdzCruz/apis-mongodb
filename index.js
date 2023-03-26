const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const productRoutes = require("./routes/products");
const prototypeRoutes = require("./routes/prototype");

const app = express();

const port = process.env.PORT || 3000;
const host = process.env.APP_HOST;

//middleware
app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', productRoutes);
app.use('/api', prototypeRoutes);

// const direccion = "../storage/imgs";

app.use('/public', express.static(`${__dirname}/storage/imgs`))

//routes
app.get('/',(req, res) => {
    res.send(__dirname);

})

//mongodb connection
mongoose
.connect(process.env.MONGODB_URI)
.then(()=> console.log("Connected to MongoDB Atlas"))
.catch((error) => console.error(error));

app.listen(port, () => console.log('Server listening on port', port));
