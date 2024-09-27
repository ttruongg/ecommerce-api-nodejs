import { expressjwt, Request as JWTRequest } from "express-jwt";
import { Jwt, JwtPayload } from "jsonwebtoken";

export function authJwt() {
    const secret = process.env.secret;
    if (!secret) throw new Error("secret undefined");

    return expressjwt({
        secret,
        algorithms: ["HS256"],
        isRevoked: isRevoked,
    }).unless({
        path: [
            { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
            "/api/v1/auth/login",
            "/api/v1/auth/register"
        ]
    })
};

async function isRevoked(request: JWTRequest, token: Jwt | undefined): Promise<boolean> {

    if (!token) {
        return true;
    }

    const payload = token.payload as JwtPayload;
    if (payload.isAdmin) {
        return false;
    }

    const userId = request.params.id;
    const userIdFromToken = payload.user;
    
    if (userId === userIdFromToken)
        return false;

    return true;
};




