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
exports.countUsers = exports.deleteUser = exports.updateUser = exports.getListOfUser = exports.getUserById = void 0;
const user_1 = require("../model/user");
const express_validator_1 = require("express-validator");
const getUserById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    try {
        const user = yield user_1.User.findById(id).select("-password");
        return user ?
            response.status(200).send(user) :
            response.status(404).send("user not found!");
    }
    catch (error) {
        response.status(400).send({ msg: error });
    }
});
exports.getUserById = getUserById;
const getListOfUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.User.find().select("-password");
    if (!users)
        return response.status(400).send("categories is empty");
    return response.status(200).send(users);
});
exports.getListOfUser = getListOfUser;
const updateUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    const result = (0, express_validator_1.validationResult)(request);
    if (!result.isEmpty())
        return response.status(400).send(result.array());
    const data = (0, express_validator_1.matchedData)(request);
    try {
        const user = yield user_1.User.findByIdAndUpdate(id, data, { new: true });
        return user ?
            response.status(200).send(user) :
            response.status(404).send("User not found");
    }
    catch (error) {
        return response.status(400).send({ err: error });
    }
});
exports.updateUser = updateUser;
const deleteUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    try {
        const deleteUser = yield user_1.User.findByIdAndDelete(id);
        return deleteUser ?
            response.status(200).send("Deleted successfully") :
            response.status(404).send("User not found!");
    }
    catch (error) {
        return response.status(400).send({ msg: error });
    }
});
exports.deleteUser = deleteUser;
const countUsers = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countUsers = yield user_1.User.countDocuments();
        return countUsers ?
            response.status(200).send({ userCount: countUsers }) :
            response.status(404).send("No users found");
    }
    catch (err) {
        return response.status(500).send("Error when counting users");
    }
});
exports.countUsers = countUsers;
