const express = require("express");
const router = express.Router();
const auth=require("../auth/auth")
const arController=require("../controller/ar")

router.post("/v1/auth/signup",arController.signup);
router.post("/v1/auth/signin",arController.signin);
router.get("/v1/auth/me",arController.getme);

module.exports=router