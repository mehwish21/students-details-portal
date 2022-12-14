const { findOne } = require('../models/studentModel')
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
let{ isValidBody,isValidName,isValid,nameRegex} = require('../validators/validator')

//===============================================REGISTER==================================================================

const register = async function(req,res){
    try{
        let {name, email, password} = req.body
        
        if(!isValidBody(req.body)) return res.status(400).send({status : false, msg : " please provide details"})

    //==========================================name====================================================================
        if(!name) return res.status(400).send({status : false, msg : "please provide  name"})
        if(!isValid(name)) return res.status(400).send({status : false, msg : "please provide valid name"})

        if(isValidName(name)) return res.status(400).send({status : false, msg : "please provide valid name"})
        if(!nameRegex.test(name))  return res.status(400).send({status: false, msg : "Please provide a correct name"})

    //==========================================email====================================================================

        if(!email) return res.status(400).send({status : false, msg : "please provide  email"})
        if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) return res.status(400).send({status : false, msg : "please provide  email"})
        let existingEmail = await userModel.findOne({email : email}) 
        if(existingEmail) return res.status(400).send({ status : false , msg : "This email is alredy registered"})
            
    //==========================================password====================================================================
        
        if(!password)  return res.status(400).send({status : false, msg : "please provide password"})
        if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(password))
            return  res.status(400).send({status : false, msg : "please provide valid password"})

            
    //==========================================creation====================================================================

            let createUser = await userModel.create({name, email, password})
            return res.status(201).send({ status : true, data : createUser})


    }
    //=====================================================================================================================

    catch(err){
        return res.status(500).send({ status : false, msg : err.message})
           
    }
}

//=========================================================================================================================

//=================================================LOGIN==================================================================

const loginUser = async function(req, res){
    
    if(!isValidBody(req.body)) return res.status(400).send({status : false, msg : " please provide login details"})

    let{email,password} = req.body

    //==============================================email=================================================================

    if(!email) return res.status(400).send({status : false, msg : "please provide  email"})
    if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) return res.status(400).send({status : false, msg : "please provide  email"})
       
    //==============================================password==============================================================

    if(!password) return res.status(400).send({status : false, msg : "please provide  password"})
    if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(password))
            return  res.status(400).send({status : false, msg : "please provide valid password"})
            
    //=============================================findOne================================================================

            let user = await userModel.findOne({email : email, password : password}) 
            if(!user) return res.status(400).send({ status : false , msg : "You're not registered"})
    
    //==============================================token=================================================================
            let token = jwt.sign(
            {
               userId : user._id.toString(),
               project : "lastOne"

            }, "i did this project on my own heh heh", {expiresIn : '1h'})

            return res.status(200).send({ status : true, msg : "successfully logged in", data : {token:token,userId: user._id ,iat: Date.now(), expiresIn :'1h'}})
    }

//========================================================================================================================



module.exports = {register, loginUser}

//========================================================================================================================