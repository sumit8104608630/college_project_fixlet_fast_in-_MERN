
// let connect the database through connection 
const mongoose=require('mongoose');
const {data_base_name}=require("../src/constants")
// let's write the code for connection to mongodb


 const connection_database=async()=>{
    try{
        if(!data_base_name){
            throw new Error("Database name is not provided");
        }
       const connection_instance= await mongoose.connect(`${process.env.MONGODB_URL}/${data_base_name}`);
    }
    catch(error){
        console.log(error.message)
        process.exit(1);
    }
}

module.exports={connection_database}