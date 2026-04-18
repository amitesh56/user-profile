const express = require("express")
const authRoute = require("../controllers/auth.user.controllers")

const router = express.Router();

router.post("/signup",authRoute.signup)
router.post("/login",authRoute.login)

module.exports=router