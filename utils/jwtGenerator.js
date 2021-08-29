const jwt = require('jsonwebtoken');
require('dotenv').config();



function GenJwtToken(user_id){
    const secret = process.env.jwtSecret || '02432f3d-28c3-4477-983c-5e51e21407fa';
    const payload = {
        user_id: user_id
    }
    return jwt.sign(payload,secret,{expiresIn: '1hr'});
}

module.exports = GenJwtToken;







