const express = require("express");
const { SignUp } = require("../controller/signUp");
const { SignIn } = require("../controller/signIn");
const { createPost } = require("../controller/createpost");
const { getAllPost } = require("../controller/getAllpost");
const { deletePost } = require("../controller/deletepost");
const router = express.Router();




// All routes is here 
router.post("/signup",SignUp);
router.post("/signin",SignIn);
router.post("/createpost",createPost);
router.get("/getallpost",getAllPost);
router.delete("/deletepost/:id",deletePost);
module.exports = router ;