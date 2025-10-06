// call the post model
const Post = require('../models/post.js');

//creating a post
const createPost =async (req, res) =>{
    //getting the data from the request body
    const post = req.body;

    //prepare what to send to the database

    const newPost =new Post({...post, creator: req.userId, createdAt: new Date().toISOString()});
    try {
        //sending the data to the database
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}


//fetching all the posts, exporting 

module.exports = {createPost}
