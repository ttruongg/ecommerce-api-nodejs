import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
    auth?: JwtPayload & { user: string }; // Thêm kiểu cho `auth` với ID user
}

export const isOwnerOrAdmin = async (
    request: AuthRequest,
    response: Response,
    next: NextFunction
) => {

    const userId = request.params.id;
    const userIdFromToken = request.auth?.user;
    const isAdmin = request.auth?.isAdmin;
    console.log(isAdmin);
    if (isAdmin || userId === userIdFromToken) {
        return next();
    } else {
        return response.status(403).send("The user is not authorized123");
    }
}