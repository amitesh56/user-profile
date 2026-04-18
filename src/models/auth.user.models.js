const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : [true , "User name already exisist"],
        minLength : 6
    },
    email : {
        type : String,
        required : true,
        unique : [true , "email already exisist please login"]
    },
    password : {
        type : String,
        required : true,
        minLength : 6
    },
    bio :{
        type : String 
    },
    profile_picture :{
        type : String 
    }
},{timestamps : true})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel