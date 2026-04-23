const userModel = require("../models/auth.user.models")
const dataValidation = require("../validator/data.validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function signup(req,res) {
    try {
        const result = dataValidation.safeParse(req.body)
        if(!result.success){
            return res.status(403).json({
                message : result.error.errors.map(e => e.message)
            })
        }
        const {username , email , password}= result.data;

        const userExisist = await userModel.findOne({
            $or :[{username},{email}]
        })

        if(userExisist){
            return res.status(401).json({
                message : "user already exisist , please login"
            })
        }

        const passwordEncrypt = await bcrypt.hash(password , parseInt(process.env.SALT))

        const createUser = await userModel.create({
            username,email,password : passwordEncrypt
        })

        const token = jwt.sign({id:createUser._id}, process.env.JWT_SECRET);

        res.cookie("token",token)

        res.status(201).json({
            message : "user is register successfully"
        })

    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

async function login(req,res) {
    try {
    
      const result = dataValidation.safeParse(req.body)
      
        if(!result.success){
            return res.status(403).json({
                message: result.error.errors.map(e => e.message)
            })
        }
        const {username , email , password}= result.data;
        

        const userExisist = await userModel.findOne({
            $or :[{username},{email}]
        })

        if(!userExisist){
            return res.status(401).json({
                message : "user doesn't exisist please register"
            })
        }

        const ispassword = await bcrypt.compare(password,userExisist.password)
        
            if(!ispassword){
                return res.status(403).json({
                    message : "the password is wrong"
                })
            }
            const token = jwt.sign({id:userExisist._id}, process.env.JWT_SECRET)
        
            res.cookie("token",token)
            res.status(200).json({
                message : "user login successfully"
            })
        

            
    } catch (error) {
         res.status(500).json({
            message : error.message
        })
    }
}


module.exports = {signup,login}