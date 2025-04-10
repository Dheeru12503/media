const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;

// this function for check file support

const isFileSupport = (files, filetype) => {
  return files.includes(filetype);
};

// function for file upload

const fileUpload = async (file, folder) => {
  const options = { folder };
  options.resource_type = "auto";
  console.log("this file is here ", file.tempFilePath);

  return await cloudinary.uploader.upload(file.tempFilePath, options);
};
exports.SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const file = req.files.profileImage;


    const supportedFile = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    // if file is not supported
    if (!isFileSupport(supportedFile, fileType)) {
      return res.json({
        success: false,
        message: "file is unsupported",
      });
    }

    // for existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        succuess: false,
        message: `user already existing form Email : ${email}`,
      });
    }

    const responseProfileImage = await fileUpload(file, "DheeruSpace");
   
    // for secure password

    let hassedPassword;
    try {
      hassedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    // creating entry of new user in data base

    const newUser = await userModel.create({
      name,
      email,
      password: hassedPassword,
      profileImage: responseProfileImage.secure_url,
    });
    res.status(200).json({
      success: true,
      data: newUser,
      message: "User Created successfully",
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
