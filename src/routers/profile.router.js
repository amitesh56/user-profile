const express = require("express")
const upload = require("../services/multer")
const authMiddle = require("../middleware/token.auth.middleware")
const profileController = require("../controllers/profile.controler")

const router = express.Router();

router.put("/update-bio",authMiddle,profileController.updateBio)
router.put("/update-picture",authMiddle,upload.single("image"),profileController.updateProfile)
router.get("/view-profile",authMiddle,profileController.viewProfile)


module.exports = router;