//===============================================IMPORT=================================================================
const jwt = require('jsonwebtoken')


//===========================================AUTHENTICATION===============================================================
 
  const auth = async function(req,res){
    try{
         token = req.headers['x-auth']
         if(!token) return res.status(401).send({status: false, msg : "please provide token"})

        jwt.verify(token,"i did this project on my own heh heh",(err,decodedToken)=>{
            if(err) return res.status(401).send({status: false, msg : "you're not authenticated"})
            else req.token = decodedToken
        })
    }

    catch(err){
        return res.status(500).send({status: false, msg : err.message})
    }
 }

 //=============================================EXPORT=====================================================================

 module.exports = auth

 //=======================================================================================================================