class ApiResponse {
    constructor(data, statusCode, message = "success") {
        this.statusCode = statusCode;           // Stores the actual HTTP status code
        this.data = data;                       // Stores the response data (e.g., JSON, object, or error message)
        this.success = statusCode < 400;        // Boolean flag indicating if the response is successful
        this.message = message;                 // Stores the response message (default is "success")
    }
}

module.exports = {
    ApiResponse
};
