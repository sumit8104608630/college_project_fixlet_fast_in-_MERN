class apiResponse{
    constructor(
        data,
        statusCode,
        message="success"
    ){
        this.data=data;
        this.statusCode=statusCode < 400;
        this.message=message
    }
}

module.exports={
    apiResponse
} 