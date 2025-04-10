const express = require("express");
const userRoute = require("./routes/userRoutes");
const fileUpload = require("express-fileupload");
const dbConnect = require("./config/database");
const cors= require("cors");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4000;

// for cookies parser
app.use(cors());
const cookieparser = require("cookie-parser");
app.use(cookieparser());

// middleware to parse json
app.use(express.json());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));
// mounting to routes
app.use("/api/v1", userRoute);

app.listen(PORT, (req, res) => {
  console.log(`Server started successfully at ${PORT}`);
});

// data base connection
dbConnect();

app.listen()
// cloudinary data base connection 
const cd = require("./config/cloudinaryDataBase");
cd.cloudinaryConnect();

app.get("/", (req, res) => {
  res.send(`<h1> this is home page baby</h1>`);
});
