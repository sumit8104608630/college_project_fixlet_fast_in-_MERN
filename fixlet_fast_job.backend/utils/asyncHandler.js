
const asyncHandler=(functions)=>{
    return  (req,res,next)=>{
        Promise.resolve(functions(req,res,next)).catch((error)=>next(error));
}
}

module.exports={
    asyncHandler
} 