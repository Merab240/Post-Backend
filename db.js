const mongoose = require('mongoose');


//function to connect to the database
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected');
}
catch(err){
        console.error(err.message);
       
    }
};
module.exports = connectDB;