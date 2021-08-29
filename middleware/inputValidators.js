


let validateEmail = (req, res, next) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    if (!re.test(String(req.body.user_email).toLowerCase())) {
      res.status(422).json('Invalid email')
    }else{
      next();
    }
}

let validateUsername = (req,res,next) =>{
    const re = /^[a-zA-Z0-9_-]+$/;
    if(! (String(req.body.user_name).length<=15 && String(req.body.user_name).length>=5 )){
      res.status(422).json('Username must be between 5 and 15 characters')
    }
    else if(!re.test(String(req.body.user_name))){
      res.status(422).json('Username must contain only letters, digits, underscore "_" or dash "-" ')
    }
    else{
      next();
    }
}

let validatePassword = (req,res,next)=>{
    if(String(req.body.user_password).length<=8){
      res.status(422).json('Password must be longer than 8 characters')
    }
    else{
      next();
    }

}

let validateWhiteboardName = (req, res, next)=>{
    const re = /^[a-zA-Z0-9_-\s]+$/;
    if(String(req.body.whiteboard_name).trim().length===0){
      res.status(422).json("Whiteboard name mustn't be empty");
    }
    else if(String(req.body.whiteboard_name).trim() !== String(req.body.whiteboard_name)){
      res.status(422).json("Whiteboard name mustn't start or end with space");
    }
    else if(String(req.body.whiteboard_name).length>20){
      res.status(422).json('Whiteboard name must be shorter than 20 characters')
    }
    else if(!re.test(String(req.body.whiteboard_name))){
      res.status(422).json('Whiteboard name must contain only letters, digits, underscore "_" or dash "-" ')
    }
    else{
      next();
    }
}


module.exports = {
  validateEmail: validateEmail,
  validateUsename: validateUsername,
  validatePassword: validatePassword,
  validateWhiteboardName: validateWhiteboardName,
}