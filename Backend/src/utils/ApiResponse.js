//making one utility class for Api response

class ApiResponse {
    constructor(
        statusCode,
        data = {},
        message = "Request successful"
    ) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.status = statusCode < 400;
    }
}

export { ApiResponse }