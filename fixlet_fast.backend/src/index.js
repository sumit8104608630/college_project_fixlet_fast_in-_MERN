//getting use of dotenv to access variable store in .env file
require("dotenv").config({path:'./.env'});
const {connection_database}=require("../db/connect")
const {app}=require("./app");
// doing connection to database  
connection_database().then(()=>
    app.on("error",(error)=>{
        console.log(error);
    }),
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server is running on port ${process.env.PORT}`)
    }),
    console.log("mongoDB is connected successfully ")).catch((error)=>{console.log({message:`error ${error}`})});
