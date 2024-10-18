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
const userController = __importStar(require("../../api/controller/userController"));
const user_1 = require("../../api/model/user");
const mock_1 = require("../utils/mock");
jest.mock("../../api/model/user");
describe("get list of users", () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });
    it("should return list of users excluding password", () => __awaiter(void 0, void 0, void 0, function* () {
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
        ];
        const findMethod = jest.spyOn(user_1.User, 'find').mockReturnValueOnce({
            select: jest.fn().mockResolvedValue(mockUsers)
        });
        yield userController.getListOfUser(mock_1.mockRequest, mock_1.mockResponse);
        expect(findMethod).toHaveBeenCalled();
        expect(mock_1.mockResponse.status).toHaveBeenCalled();
        expect(mock_1.mockResponse.status).toHaveBeenCalledWith(200);
        expect(mock_1.mockResponse.send).toHaveBeenCalledWith(mockUsers);
    }));
    it("shold return status of 400 if no users found", () => __awaiter(void 0, void 0, void 0, function* () {
        const findMethod = jest.spyOn(user_1.User, 'find').mockReturnValueOnce({
            select: jest.fn().mockResolvedValue(null)
        });
        yield userController.getListOfUser(mock_1.mockRequest, mock_1.mockResponse);
        expect(findMethod).toHaveBeenCalled();
        expect(mock_1.mockResponse.status).toHaveBeenCalledWith(400);
        expect(mock_1.mockResponse.send).toHaveBeenCalledWith("users not found!");
    }));
});
