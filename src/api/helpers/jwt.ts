import { expressjwt, Request as JWTRequest } from "express-jwt";
import { Jwt, JwtPayload } from "jsonwebtoken";

export function authJwt() {
    const secret = process.env.secret;
    if (!secret) throw new Error("undefined");

    return expressjwt({
        secret,
        algorithms: ["HS256"],
        //isRevoked: isRevoked,
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





