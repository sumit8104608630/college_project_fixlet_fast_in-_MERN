const express=require("express");
// cors for the specific url
const cors=require("cors");
// cookieParser for the storing the jwt token
const cookieParser =require("cookie-parser");


// create the app for the other functionality
const app=express();
//setting cors origin for secure response
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}))
// setting json type with limit
app.use(express.json({limit:"1mb"}));
// let set static folder for the image and folder
app.use(express.static("public"));
// let set cookie-parser 
app.use(cookieParser());



// let export the app

module.exports={app}




