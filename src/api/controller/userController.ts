import { Request, Response } from "express";
import { User } from "../model/user";
import { matchedData, validationResult } from "express-validator";

export const getUserById = async (request: Request, response: Response) => {
    const id = request.params.id;
    try {
        const user = await User.findById(id).select("-password");
        return user ?
            response.status(200).send(user) :
            response.status(404).send("user not found!");
    } catch (error) {
        response.status(400).send({ msg: error });
    }
};

export const getListOfUser = async (request: Request, response: Response) => {
    const users = await User.find().select("-password");
    if (!users) return response.status(400).send("categories is empty");
    return response.status(200).send(users);
};

export const updateUser = async (request: Request, response: Response) => {
    const id = request.params.id;
    const result = validationResult(request);
    if (!result.isEmpty()) return response.status(400).send(result.array());
    const data = matchedData(request);
    try {
        const user = await User.findByIdAndUpdate(id, data, { new: true });
        return user ?
            response.status(200).send(user) :
            response.status(404).send("User not found");
    } catch (error) {
        return response.status(400).send({ err: error });
    }
};

export const deleteUser = async (request: Request, response: Response) => {
    const id = request.params.id;
    try {
        const deleteUser = await User.findByIdAndDelete(id);
        return deleteUser ?
            response.status(200).send("Deleted successfully") :
            response.status(404).send("User not found!");
    } catch (error) {
        return response.status(400).send({ msg: error });
    }
};