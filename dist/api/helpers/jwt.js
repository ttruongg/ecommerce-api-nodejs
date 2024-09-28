"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authJwt = void 0;
const express_jwt_1 = require("express-jwt");
function authJwt() {
    const secret = process.env.secret;
    if (!secret)
        throw new Error("secret undefined");
    return (0, express_jwt_1.expressjwt)({
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
    });
}
exports.authJwt = authJwt;
;
function isRevoked(request, token) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!token) {
            return true;
        }
        const payload = token.payload;
        if (payload.isAdmin) {
            return false;
        }
        const userId = request.params.id;
        const userIdFromToken = payload.user;
        if (userId === userIdFromToken)
            return false;
        return true;
    });
}
;
