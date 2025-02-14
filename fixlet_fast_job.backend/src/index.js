// let's require the app 
const {app} =require("./app.js")
// let get the access to the .env file 
require('dotenv').config({path:"./.env"});
// let get connected to the database
const {new_connection_database,fixle_fast_user_application}=require("../db/connection.js");
// doing connection to database  
new_connection_database().then(()=>{
    app.on("error",(error)=>{
        console.log(error);
    }),
    console.log("Fixlet_fast_job mongoDB is connected successfully ")
}).catch((error)=>{console.log({message:`error ${error}`})});

fixle_fast_user_application().then(()=>{
    app.on("error",(error)=>{
        console.log(error);
    }),
    console.log("Fixlet_fast_user mongoose is connected successfully ")
}).catch((error)=>{console.log({message:`error ${error}`})});

// let's start the server
app.listen(process.env.PORT||6000,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})