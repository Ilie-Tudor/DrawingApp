const router = require('express').Router();
const pool  = require('../db');
const bcrypt = require('bcrypt');
const GenJwtToken = require('../utils/jwtGenerator');
const {validateEmail, validateUsename, validatePassword} = require('../middleware/inputValidators');


router.post('/register', validateUsename, validateEmail, validatePassword, async (req,res)=>{
    
    try {
        let {user_name,user_email,user_password} = req.body;
        let verifyEmailAndUsername = await pool.query("Select * from users where user_email = $1 or user_name = $2",[user_email,user_name]);
        if(verifyEmailAndUsername.rows.length === 2){
            res.status(409).json('Email and username already in use');
        }
        else if(verifyEmailAndUsername.rows.length === 1){
            if(user_name == verifyEmailAndUsername.rows[0].user_name && user_email == verifyEmailAndUsername.rows[0].user_email){
                res.status(409).json('Email and username already in use');
            }
            else if(user_name == verifyEmailAndUsername.rows[0].user_name){
                res.status(409).json('Username already in use');
            }
            else{
                res.status(409).json('Email already in use');
            }
        }
        else{
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const bcryptPass = await bcrypt.hash(user_password, salt);

            const newUser = await pool.query('insert into users(user_name, user_email, user_password) values($1,$2,$3) returning *',
            [user_name,user_email,bcryptPass])

            const token = GenJwtToken(newUser.rows[0].user_id);

            res.json({token});

        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
})

router.post('/login',async(req, res)=>{

    try {
        let {user_nameOrEmail, user_password} = req.body;
        let user  = await pool.query('select * from users where user_name = $1 or user_email = $1', [user_nameOrEmail])
        if(user.rows.length===0){
            res.status(401).json('user or email invalid');
        }
        else{
            let validPass = await bcrypt.compare(user_password, user.rows[0].user_password);
            if(validPass){
                let token = GenJwtToken(user.rows[0].user_id);
                res.json({token: token});
            }
            else{
                res.status(401).json('user or email invalid');
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
    
})




module.exports = router;