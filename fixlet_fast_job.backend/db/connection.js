// let's require the mongoose 
const mongoose=require("mongoose");
//let get current name of the data base
const {fixlet_fast_job_application_data_base_name,fixlet_fast_user_data_base_name}=require("../src/constant");

const new_connection_database=async()=>{
try {
        if(!fixlet_fast_job_application_data_base_name){
            console.log("database name is not defined");
        }
        const connection= await mongoose.createConnection(`${process.env.MONGODB_URL}/${fixlet_fast_job_application_data_base_name}`)
} catch (error) {
    console.log(error)
    process.exit(1);
}
}

const fixle_fast_user_application=async()=>{
    try {
        if(!fixlet_fast_user_data_base_name)
        {
            console.log("database name is not defined");
        }
        await mongoose.createConnection(`${process.env.MONGODB_URL}/${fixlet_fast_user_data_base_name}`)
    } catch (error) {
        console.log(error)
        process.exit(error)
    }
}

module.exports={
    new_connection_database,
    fixle_fast_user_application
}