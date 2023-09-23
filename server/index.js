const express = require("express");
const app = express();

const profileRouts = require("./routes/Profile");
const courseRouts = require("./routes/Course");
const paymentRouts = require("./routes/Payment");
const userRouts = require("./routes/User");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudnery");
const { dbconnect } = require("./config/database");
const fileUpload = require("express-fileupload");
require("dotenv").config();




const PORT = process.env.PORT || 4000;
//database connection
dbconnect();
//middleweare
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"*",
		credentials:true,
    })
);

app.use(
    fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/'
    })
)

//cloudenry connection
cloudinaryConnect();

//routes mounting
app.use("/api/v1/course",courseRouts);
app.use("/api/v1/payment",paymentRouts);
app.use("/api/v1/profile",profileRouts);
app.use("/api/v1/user",userRouts);


app.listen(PORT, () =>{
    console.log(`your app is runing at port no ${PORT}`);
})
