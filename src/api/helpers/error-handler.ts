import { NextFunction, Request, Response } from "express";

export function error_Handler(error: Error, request: Request,
    response: Response, next: NextFunction) {

    if (error.name === 'UnauthorizedError')
        return response.status(401).send("The user is not authorized");

    if (error.name === 'ValidationError')
        return response.status(401).json({msg: error});

    return response.status(500).json(error);
}