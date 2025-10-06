const express =require('express');
const app=express();
require('dotenv').config();
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");

//importing the database connection file
const connectDB=require('./db');

//middleware for parsing json data
app.use(express.json());


//creating our first route
app.get('/',(req,res)=>{
    res.send('Hello World');
});

//routes
app.use('/user',userRoutes);
app.use('/posts',postRoutes);



const PORT = process.env.PORT;

//listening to the server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

connectDB();