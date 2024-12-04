

const asyncHandler=(functions)=>{
(req,res,next)=>{
  Promise.resolve(functions(req,res,next)).catch((err)=>next(err));
}
}

module.exports={
    asyncHandler
} 