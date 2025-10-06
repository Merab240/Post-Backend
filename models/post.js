const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title:String,
        message: String,
        creator: String,
        createdAt:{
            type: Date,
            default: new Date()
        }
    
});

module.exports = mongoose.model('Post', postSchema);