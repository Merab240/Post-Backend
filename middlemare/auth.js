//importing the jwt package to verify the token
const jwt = require('jsonwebtoken');

//middleware function to authenticate the user
const auth = async (req, res, next) =>{
    try {
        
        const token = req.headers.authorization.split(" ")[1];

        let decodedData;

        if(token){
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData.id;

            
        }
        next();
    } catch (error) {
       res.status(401).json({message: "invalid token"}); 
    }
}

//exporting the middleware function
module.exports = auth;