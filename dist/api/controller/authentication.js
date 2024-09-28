"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.logInUser = exports.registerUser = void 0;
const helper_1 = require("../utils/helper");
const user_1 = require("../model/user");
const express_validator_1 = require("express-validator");
const jwt = __importStar(require("jsonwebtoken"));
const registerUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(request);
    if (!result.isEmpty())
        return response.status(400).send({ error: result.array() });
    const data = (0, express_validator_1.matchedData)(request);
    data.password = (0, helper_1.hashingPassword)(data.password);
    const newUser = new user_1.User(data);
    try {
        const saveUser = yield newUser.save();
        return response.status(201).send(saveUser);
    }
    catch (error) {
        return response.status(400).json({ msg: error });
    }
});
exports.registerUser = registerUser;
const logInUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const email = request.body.email;
    const password = request.body.password;
    const secret = process.env.secret;
    if (!secret) {
        throw new Error("secret is undefined");
    }
    if (!email || !password) {
        return response.status(400).send("Email and password are required");
    }
    const user = yield user_1.User.findOne({ email });
    if (!user)
        return response.status(401).send("User not found");
    if (user && (0, helper_1.comparePassword)(password, user.password)) {
        const token = jwt.sign({
            user: user.id,
            isAdmin: user.isAdmin,
        }, secret, {
            expiresIn: "1d"
        });
        response.status(200).send({ user: user.email, token: token });
    }
    else {
        response.status(400).send("Password is not correct");
    }
});
exports.logInUser = logInUser;
