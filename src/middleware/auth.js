//===============================================IMPORT=================================================================
const jwt = require('jsonwebtoken')


//===========================================AUTHENTICATION===============================================================
 
const auth = function (req, res, next) {
    try {
  
      let token = req.headers["x-api-key"];
      if (!token) return res.status(404).send({ status: false, msg: "token must be present" });
  
      let decodedToken = jwt.verify(token, "Project-1 Blogging-group-6");
  
      if (!decodedToken)
        return res.status(401).send({ status: false, msg: "Invalid Token" })
  
      next();
  
  
    } catch (error) {
      console.log(error)
      return res.status(500).send({ status: false, Error: error.message })
    }
  }

 //=============================================EXPORT=====================================================================

 module.exports = auth

 //=======================================================================================================================