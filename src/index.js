const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const productRoutes = require("./routes/products");
const prototypeRoutes = require("./routes/prototype");

const app = express();

const port = process.env.PORT || 9000;

//middleware
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', productRoutes);
app.use('/api', prototypeRoutes);

//routes
app.get('/',(req, res) => {
    res.send("welcome to my API");
})

//mongodb connection
mongoose
.connect(process.env.MONGODB_URI)
.then(()=> console.log("Connected to MongoDB Atlas"))
.catch((error) => console.error(error));

app.listen(port, () => console.log('Server listening on port', port));
