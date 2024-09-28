"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error_Handler = void 0;
function error_Handler(error, request, response, next) {
    if (error.name === 'UnauthorizedError')
        return response.status(401).send("The user is not authorized");
    if (error.name === 'ValidationError')
        return response.status(401).json({ msg: error });
    return response.status(500).json(error);
}
exports.error_Handler = error_Handler;
