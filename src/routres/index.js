const express = require("express");
const router = express.Router();
const userController = require("../twitterController/userController");
const tweetsController = require("../twitterController/tweetsController");
const isAuth = require("../middleWares/isAuth")

router.get("/", tweetsController.findAll);
router.get("/username",  tweetsController.findOne);

router.post("/tweet", tweetsController.addOne);
router.get("/signup", userController.signup);
router.post("/signup", userController.newAccount);
router.get("/login", userController.login);
router.post("/login", userController.authenticate);
router.get('/logout', userController.logout)

module.exports = router;
