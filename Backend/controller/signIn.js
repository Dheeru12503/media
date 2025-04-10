const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // user is not existing
    const userId = await userModel.findOne({ email });
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }

    // make playload for jwt

    const payload = {
      email: userId.email,
      id: userId._id,
    };

    // verify password and make jwt token

    if (await bcrypt.compare(password, userId.password)) {
      let token = jwt.sign(payload, process.env.JWT, {
        expiresIn: "2h",
      });

      userId.token = token;
      userId.password = undefined;
    
      // make option for cookies
      const option = {
        expire: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      // make cookies

      res.cookie("token", token, option).status(200).
        json({
          success: true,
          token,
          userId,
          message: "User logged in successfully",
        });
    } else {
      return res.status(403).json({
        success: false,
        message: "Password incorrect",
      });
    }  
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Login failure",
      error: err.message,
    });
  }
};
