const jwt =  require('jsonwebtoken');
require('dotenv').config();


let tokenVerification = async(req,res,next)=>{

    try {
        const secret = process.env.jwtSecret || '02432f3d-28c3-4477-983c-5e51e21407fa';
        const jwtToken = req.header("token");

        if(!jwtToken){
            return res.status(403).json("not authorized");
        }

        const payload = await jwt.verify(jwtToken, secret);

        req.user_id = payload.user_id;
        next();
        
    } catch (error) {
        console.error(error);
        if(error.name === 'TokenExpiredError'){
            return res.status(401).json('Session expired')
        }
        else{
            return res.status(500).json("Server error");
        }
    }
}

module.exports = tokenVerification