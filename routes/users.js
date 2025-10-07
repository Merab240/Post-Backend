
const express =require("express");
const {register} = require("../controllers/user")
const { updateUser} = require("../controllers/user")
const {getUsers} = require("../controllers/user");
const {deleteUser} = require("../controllers/user");
const {login} = require("../controllers/user"); 

const router = express.Router();


router.post('/register',register);
router.post('/login',login);
router.get('/getUsers', getUsers);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);




module.exports = router;