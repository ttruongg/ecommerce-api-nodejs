import { Request, Response } from "express-serve-static-core";
import * as userController from "../../api/controller/userController";
import { User } from "../../api/model/user";
import { mockRequest, mockResponse } from "../utils/mock";
jest.mock("../../api/model/user");

describe("get list of users", () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it("should return list of users excluding password", async () => {

        const mockUsers = [
            {
                _id: 1,
                name: "name",
                email: "abc@gmail.com",
                phone: "6",
                isAdmin: false,
            },
            {

                _id: 2,
                name: "name2",
                email: "name2@gmail.com",
                phone: "0352147895",
                isAdmin: false,

            }
        ]

        const findMethod = jest.spyOn(User, 'find').mockReturnValueOnce({
            select: jest.fn().mockResolvedValue(mockUsers)
        } as any);

        await userController.getListOfUser(mockRequest, mockResponse);
        expect(findMethod).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith(mockUsers)
    });
    it("shold return status of 400 if no users found", async () => {
        const findMethod = jest.spyOn(User, 'find').mockReturnValueOnce({
            select: jest.fn().mockResolvedValue(null)
        } as any);
        await userController.getListOfUser(mockRequest, mockResponse);
        expect(findMethod).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.send).toHaveBeenCalledWith("users not found!")
    })
})