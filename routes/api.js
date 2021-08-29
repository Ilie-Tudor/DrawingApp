const router = require('express').Router();
const pool  = require('../db');
const tokenVerification = require('../middleware/tokenVerification');
const {validateWhiteboardName} = require('../middleware/inputValidators');


router.get('/test', (req, res)=>{
    res.json('merge');
})

router.get('/getuserinfo',tokenVerification, async(req,res)=>{
    try {
        let userinfo  = await pool.query('select user_name from users where user_id = $1',[req.user_id])
        res.json(userinfo.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
})
router.get('/getwhiteboards',tokenVerification, async(req,res)=>{
    try {
        let whiteboards  = await pool.query('select * from whiteboards where user_id = $1 order by whiteboard_id',[req.user_id])
        res.json(whiteboards.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
})
router.get('/getwhiteboard/:wid',tokenVerification, async(req,res)=>{
    try {
        let whiteboard = await pool.query('select * from whiteboards where user_id = $1 and whiteboard_id = $2',[req.user_id,req.params.wid]);
        res.json(whiteboard.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
})
router.post('/addwhiteboard',tokenVerification,validateWhiteboardName, async(req,res)=>{
    try {
        let newWhiteboard = await pool.query('insert into whiteboards (whiteboard_name, whiteboard_content, user_id) values($1,$2,$3) returning *',[req.body.whiteboard_name,'',req.user_id])
        res.json(newWhiteboard.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
})
router.put('/savewhiteboard/:wid', tokenVerification, async(req, res)=>{
    try {
        let savedWhiteboard = await pool.query('update whiteboards set whiteboard_content = $1 where whiteboard_id = $2 and user_id = $3 returning *',[req.body.content, req.params.wid, req.user_id]);
        res.json(savedWhiteboard.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
})
router.post('/deletewhiteboard/:wid', tokenVerification, async(req, res)=>{
    try {
        let deletedWhiteboard = await pool.query('delete from whiteboards where whiteboard_id = $1 and user_id = $2 returning *',[req.params.wid, req.user_id]);
        res.json(deletedWhiteboard.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
})
router.post('/renamewhiteboard/:wid', tokenVerification, validateWhiteboardName, async(req, res)=>{
    try {
        let renamedWhiteboard = await pool.query('update whiteboards set whiteboard_name = $3 where whiteboard_id = $1 and user_id = $2 returning *',[req.params.wid, req.user_id, req.body.whiteboard_name]);
        res.json(renamedWhiteboard.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
})



module.exports = router;