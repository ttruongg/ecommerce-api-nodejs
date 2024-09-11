import { hashingPassword } from "../utils/helper";
import { Request, Response } from "express";
import { User } from "../model/user";
import { validationResult, matchedData } from "express-validator";

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

export const logInUser = (request: Request, response: Response) => {

};