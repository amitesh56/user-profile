const userModel = require("../models/auth.user.models")
const uploadFile = require("../services/cloudnary")

async function viewProfile(req,res) {
    try {
        const ownerId = req.user.id
        const result = await userModel.findOne({_id:ownerId}).select("-password")
        if(!result){
            return res.status(404).json({
                message : "user not found"
            })
        }
        res.status(200).json({
            result
        })


    } catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}

async function updateBio(req,res) {
    try{

    const ownerId = req.user.id
    const bio = req.body.bio
    const result = await userModel.findOneAndUpdate({_id : ownerId},{bio},{new:true}).select("-password")
    if(!result){
        return res.status(404).json({
            message : "user not found"
        })
    }
    res.status(201).json({
        message : "bio is updated",
        result
    })

    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}

async function updateProfile(req,res) {
    try{
    const ownerId = req.user.id;
    const file = req.file.buffer;


    const url = await uploadFile(file)
    if(!url){
        return res.status(404).json({
            message : "file is not uploaded"
        })
    }

    const result = await userModel.findOneAndUpdate({_id:ownerId},{profile_picture : url},{new:true}).select("-password")

    if(!result){
        return res.status(404).json({
            message : "user is not found"
        })
    }

    res.status(201).json({
        message : "profile photo is updated ",
        result
    })


    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}

module.exports = {viewProfile , updateBio,updateProfile}