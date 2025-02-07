const multer =require("multer");
const path=require("path");

const storage=multer.diskStorage({
    destination:function(req,file,cb){
    cb(null,path.resolve("./public/upload"));
    },
    filename:function(req,file,cb){
        const filename=`${Date.now()}-${file.originalname}`
        cb(null,filename)
    }

})

const upload=multer({storage:storage});
module.exports=upload;
