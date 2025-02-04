// let's create the ApiError class for the apiError handling
class ApiError extends Error{

    constructor(statusCode,errors=[],message,stack="")
    
    {
        super(message)
        this.statusCode=statusCode;
        this.errors=errors;
        this.message=message;
        this.data=null;
        this.stack=false;
        if(stack){
            this.stack=stack;
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

module.exports={
    ApiError
}