class AppError extends Error {
    // Error class for handling errors
    constructor() {
        super();
    }

    create(message, statusCode, statusText) {
        this.message = message;
        this.statusCode = statusCode;
        this.statusText = statusText;
        return this;
    }
}

module.exports = new AppError();
