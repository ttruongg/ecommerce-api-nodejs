import { hashingPassword, comparePassword } from "../utils/helper";
import { Request, Response } from "express";
import { User } from "../model/user";
import { validationResult, matchedData } from "express-validator";
import * as jwt from "jsonwebtoken";

export const registerUser = async (request: Request, response: Response) => {
    const result = validationResult(request);
    if (!result.isEmpty()) return response.status(400).send({ error: result.array() });

    const data = matchedData(request);
    data.password = hashingPassword(data.password);
    const newUser = new User(data);
    try {
        const saveUser = await newUser.save();
        return response.status(201).send(saveUser);
    } catch (error) {
        return response.status(400).json({ msg: error });
    }
};

export const logInUser = async (request: Request, response: Response) => {
    const email = request.body.email;
    const password = request.body.password;
    const secret = process.env.secret;
    if (!secret) {
        throw new Error("secret is undefined");
      }
    if (!email || !password) {
        return response.status(400).send("Email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user) return response.status(401).send("User not found");

    if (user && comparePassword(password, user.password!)) {
        const token = jwt.sign(
            {
                user: user.id,
                isAdmin: user.isAdmin,
            },
            secret,
            {
                expiresIn: "1d"
            }
        )
        response.status(200).send({ user: user.email, token: token });
    } else {
        response.status(400).send("Password is not correct");
    }

};