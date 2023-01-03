"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapApplicationError = exports.ApplicationError = void 0;
class ApplicationError extends Error {
    constructor(status, message, error) {
        super(message);
        this.status = status;
        this.message = message;
        if (error) {
            this.initialError = error;
        }
    }
}
exports.ApplicationError = ApplicationError;
function wrapApplicationError(status, message, error) {
    if (error instanceof ApplicationError) {
        error.message =
            message +
                " -> " +
                (error.initialError ? error.initialError.message : error.message);
        return error;
    }
    return new ApplicationError(status, message, error);
}
exports.wrapApplicationError = wrapApplicationError;
