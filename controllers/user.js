
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//function to create a new user
//first controller
const register = async (req, res)=>{
    const {firstName, lastName, email, password, confirmPassword} =  req.body;
    try {
        //checks if the email already exists
       const existingUser = await User.findOne({email}); 
       if (existingUser)
        return res.status(404).json({message: "User already exists"});
//cecks if the password and confirm password are same

       if (password !== confirmPassword)
        return res.status(400).json({message: "Password don't match"});
       const hashedPassword = await bcrypt.hash(password, 12);

       //creates a new user
      const result = await User.create({
        email:email, 
        password:hashedPassword, 
        name:`${firstName} ${lastName}`
       
    });
      
      //token used for authorizing the user
       const token =jwt.sign({
        email: result.email, 
        id:result._id, }, 'test',
         {expiresIn: "1h" });
       res.status(200).json({message: "User created", result, token});
    } 
    catch (error) {
         res.status(500).json({message: "Something went wrong"});
        
    }
}

//second controller
const login = async (req, res) =>{
    //what i want to get from the body
    const {email, password} = req.body;
try {
    //checks if the user exists
    const existingUser = await User.findOne({email});
    
    if(!existingUser) return res.status(404).json({message: "User doesn't exist"});

//checks if the password is correct
const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

if(!isPasswordCorrect) return res.status(400).json({message: "Invalid password"});
const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"});
res.status(200).json({result: existingUser, token});

//  Include role in the JWT payload
    const tokenAdmin = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
        
      },
       "test", 
      { expiresIn: "1h" }
    );

    // Return user info and token
    res.status(200).json({
      result: existingUser,
      token,
    });
} catch (error) {
    
}
res.status(500).json({message: "Something went wrong"});
}

//fourth controller, get user 
const getUsers = async (req, res) =>{
   
    try {
        const users = await User.find().select('-password');
        if(!users) return res.status(404).json({message: "User not found"}); 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
}

//third controller. update post controller
const updateUser = async (req, res) =>{
    try {
        
        const {id} = req.params;
        const {firstName, lastName, email, password, confirmPassword} = req.body;

        // check password match if updating password
        if (password !== confirmPassword)
        return res.status(400).json({message: "Password don't match"});

        const updates = {};
        if (firstName && lastName) {
            updates.name = `${firstName} ${lastName}`;
        }
        if (email) updates.email = email;
        if (password) updates.password = await bcrypt.hash(password, 12);

        const updatedUser = await User.findByIdAndUpdate(id, updates, {new: true});
        if (!updatedUser) return res.status(404).json({message: "User not found"});
        res.status(200).json({message: "User updated", updatedUser});

        
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
        
    }

}



//fifth controller- Delete user

const deleteUser = async (req, res) =>{
    try {
        const {id} = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) return res.status(404).json({message: "User not found"});

        res.status(200).json({message: "User deleted successfully", deletedUser});

    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message});
        
    }
};
   
module.exports = {
    register,
    login,
    updateUser,
    getUsers,
    deleteUser

};


