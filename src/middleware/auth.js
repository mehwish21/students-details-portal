//===============================================IMPORT=================================================================
const jwt = require('jsonwebtoken')


//===========================================AUTHENTICATION===============================================================
 
const auth = async function (req, res, next) {
    try {

        let token = req.headers.authorization
        if (!token) {
            return res.status(401).send({ status: false, msg: "Token is required" })
        }

        token = token.split(" ")[1]

        jwt.verify(token, "functionup-plutonium-productsManagement-Project66-secret-key", (error, decodedToken) => {
            if (error) {
                return res.status(401).send({ status: false, message: "Token is invalid" })
            } else {
                req.token = decodedToken
                next()
            }
        })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


 //=============================================EXPORT=====================================================================

 module.exports = auth

 //=======================================================================================================================