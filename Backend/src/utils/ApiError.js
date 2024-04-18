//making apiError utility function

class ApiError extends Error {
    constructor(
        statusCode,
        message = "something went wrong",
        data = {},
        errors = []
    ) {
        super(message)
        this.statusCode = statusCode;
        this.data = data;
        this.errors = errors;
        this.success = false;
    }
}


export { ApiError }