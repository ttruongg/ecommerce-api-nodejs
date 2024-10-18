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
const mock_1 = require("../utils/mock");
const categoryController = __importStar(require("../../api/controller/categoryHandler"));
const category_1 = require("../../api/model/category");
const validator = __importStar(require("express-validator"));
jest.mock("../../api/model/category");
jest.mock("express-validator", () => ({
    validationResult: jest.fn(() => ({
        isEmpty: jest.fn(() => false),
        array: jest.fn(() => [{ msg: "Invalid field" }]),
    })),
    matchedData: jest.fn(() => ({
        name: "computers",
        icon: "icon-computer",
        color: "#050505"
    }))
}));
const categories = [
    {
        _id: "1",
        name: "computers",
        icon: "icon-computer",
    },
    {
        _id: "2",
        name: "tablet",
        icon: "icon-tablet",
    },
];
describe("return list of categories", () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });
    it("should return list of categories", () => __awaiter(void 0, void 0, void 0, function* () {
        const findMethod = jest.spyOn(category_1.Category, 'find').mockResolvedValueOnce(categories);
        yield categoryController.getListCategory(mock_1.mockRequest, mock_1.mockResponse);
        expect(findMethod).toHaveBeenCalled();
        expect(mock_1.mockResponse.status).toHaveBeenCalled();
        expect(mock_1.mockResponse.status).toHaveBeenCalledWith(200);
        expect(mock_1.mockResponse.send).toHaveBeenCalledWith(categories);
    }));
    it("return status of 400 when no categories found", () => __awaiter(void 0, void 0, void 0, function* () {
        const findMethod = jest.spyOn(category_1.Category, 'find').mockResolvedValueOnce([]);
        yield categoryController.getListCategory(mock_1.mockRequest, mock_1.mockResponse);
        expect(findMethod).toHaveBeenCalled();
        expect(mock_1.mockResponse.status).toHaveBeenCalled();
        expect(mock_1.mockResponse.status).toHaveBeenCalledWith(400);
        expect(mock_1.mockResponse.json).toHaveBeenCalledWith({ categoryList: "empty" });
    }));
});
const mockCategory = {
    name: "computers",
    icon: "icon-computer",
    color: "#050505"
};
describe("get category by id", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should return status of 200 and category by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const findById = jest.spyOn(category_1.Category, "findById").mockResolvedValueOnce(mockCategory);
        yield categoryController.getCategoryById(mock_1.mockRequest, mock_1.mockResponse);
        expect(findById).toHaveBeenCalledWith("1");
        expect(mock_1.mockResponse.status).toHaveBeenCalledWith(200);
        expect(mock_1.mockResponse.json).toHaveBeenCalledWith({ category: mockCategory });
    }));
    it("return status of 404 when category not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const findById = jest.spyOn(category_1.Category, "findById").mockResolvedValueOnce(null);
        yield categoryController.getCategoryById(mock_1.mockRequest, mock_1.mockResponse);
        expect(findById).toHaveBeenCalledWith("1");
        expect(mock_1.mockResponse.status).toHaveBeenCalledWith(404);
        expect(mock_1.mockResponse.json).toHaveBeenCalledWith({ sucess: false, msg: "category not found!" });
    }));
    it("return status of 400 and error message when an exception occur", () => __awaiter(void 0, void 0, void 0, function* () {
        const findByIdMethod = jest
            .spyOn(category_1.Category, 'findById')
            .mockRejectedValueOnce(new Error("Database error"));
        yield categoryController.getCategoryById(mock_1.mockRequest, mock_1.mockResponse);
        expect(findByIdMethod).toHaveBeenCalledWith("1");
        expect(mock_1.mockResponse.status).toHaveBeenCalledWith(400);
        expect(mock_1.mockResponse.json).toHaveBeenCalledWith({ error: new Error("Database error") });
    }));
});
describe("add new category", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    const mockRequest = {};
    it("return status of 400 when there are errors", () => {
        categoryController.addCategory(mockRequest, mock_1.mockResponse);
        expect(validator.validationResult).toHaveBeenCalled();
        expect(validator.validationResult).toHaveBeenCalledWith(mockRequest);
        expect(mock_1.mockResponse.status).toHaveBeenCalledWith(400);
        expect(mock_1.mockResponse.send).toHaveBeenCalledWith({ "error": [{ msg: "Invalid field" }] });
    });
    it("should return status of 201 when category created", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(validator, "validationResult").mockReturnValueOnce({
            isEmpty: jest.fn().mockReturnValue(true),
            array: jest.fn(), // Mock method array
            mapped: jest.fn(), // Mock method mapped
            formatWith: jest.fn(), // Mock method formatWith
            throw: jest.fn() // Mock method throw
        });
        const saveMethod = jest
            .spyOn(category_1.Category.prototype, "save")
            .mockResolvedValueOnce({
            id: 1,
            name: "computers",
            icon: "icon-computer",
            color: "#050505"
        });
        yield categoryController.addCategory(mockRequest, mock_1.mockResponse);
        expect(validator.matchedData).toHaveBeenCalled();
        expect(validator.matchedData).toHaveBeenCalledWith(mockRequest);
        expect(category_1.Category).toHaveBeenCalledWith({
            name: "computers",
            icon: "icon-computer",
            color: "#050505"
        });
        expect(saveMethod).toHaveBeenCalled();
        expect(mock_1.mockResponse.status).toHaveBeenCalledWith(201);
        expect(mock_1.mockResponse.send).toHaveBeenCalledWith({
            id: 1,
            name: "computers",
            icon: "icon-computer",
            color: "#050505"
        });
    }));
    it("return status of 400 when database fails to save category", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(validator, "validationResult").mockReturnValueOnce({
            isEmpty: jest.fn().mockReturnValue(true),
            array: jest.fn(), // Mock method array
            mapped: jest.fn(), // Mock method mapped
            formatWith: jest.fn(), // Mock method formatWith
            throw: jest.fn() // Mock method throw
        });
        const saveMethod = jest
            .spyOn(category_1.Category.prototype, "save")
            .mockImplementationOnce(() => Promise.reject("fail to save category"));
        yield categoryController.addCategory(mockRequest, mock_1.mockResponse);
        expect(saveMethod).toHaveBeenCalled();
        expect(mock_1.mockResponse.status).toHaveBeenCalledWith(400);
        expect(mock_1.mockResponse.send).toHaveBeenCalledWith({ error: "fail to save category" });
    }));
});
describe("delete category", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("status of 200 when delete successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const findByIdAndDelete = jest
            .spyOn(category_1.Category, "findByIdAndDelete")
            .mockResolvedValueOnce({
            id: "1",
            name: "tablet",
            icon: "icon-tablet",
            color: "#050505"
        });
        yield categoryController.deleteCategory(mock_1.mockRequest, mock_1.mockResponse);
        expect(findByIdAndDelete).toHaveBeenCalledWith(mock_1.mockRequest.params.id);
        expect(mock_1.mockResponse.status).toHaveBeenCalledWith(200);
        expect(mock_1.mockResponse.json).toHaveBeenCalledWith({ sucess: true, msg: "Category is deleted" });
    }));
    it("return status of 404 when user not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const findByIdAndDelete = jest
            .spyOn(category_1.Category, "findByIdAndDelete")
            .mockResolvedValueOnce(null);
        yield categoryController.deleteCategory(mock_1.mockRequest, mock_1.mockResponse);
        expect(findByIdAndDelete).toHaveBeenCalledWith(mock_1.mockRequest.params.id);
        expect(mock_1.mockResponse.status).toHaveBeenCalledWith(404);
        expect(mock_1.mockResponse.json).toHaveBeenCalledWith({ sucess: false, msg: "category not found!" });
    }));
    it("return status of 400 when fails to delete category", () => __awaiter(void 0, void 0, void 0, function* () {
        const findByIdAndDelete = jest
            .spyOn(category_1.Category, "findByIdAndDelete")
            .mockRejectedValueOnce(new Error("Database error"));
        yield categoryController.deleteCategory(mock_1.mockRequest, mock_1.mockResponse);
        expect(findByIdAndDelete).toHaveBeenCalledWith(mock_1.mockRequest.params.id);
        expect(mock_1.mockResponse.status).toHaveBeenCalledWith(400);
        expect(mock_1.mockResponse.json).toHaveBeenCalledWith({
            sucess: false,
            error: new Error("Database error")
        });
    }));
});
describe("update category", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("return status of 400 if there are validation errors", () => __awaiter(void 0, void 0, void 0, function* () {
        yield categoryController.updateCategory(mock_1.mockRequest, mock_1.mockResponse);
        expect(validator.validationResult).toHaveBeenCalled();
        expect(validator.validationResult).toHaveBeenCalledWith(mock_1.mockRequest);
        expect(mock_1.mockResponse.status).toHaveBeenCalledWith(400);
        expect(mock_1.mockResponse.json).toHaveBeenCalledWith({ "error": [{ msg: "Invalid field" }] });
    }));
    it("should update category and return status of 200 if successful", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(validator, "validationResult").mockReturnValueOnce({
            isEmpty: jest.fn().mockReturnValue(true),
            array: jest.fn(), // Mock method array
            mapped: jest.fn(), // Mock method mapped
            formatWith: jest.fn(), // Mock method formatWith
            throw: jest.fn() // Mock method throw
        });
        const updatedCategory = {
            name: "updated beauty",
            icon: "updated icon-beauty",
            color: "updated #065705"
        };
        jest.spyOn(validator, "matchedData").mockReturnValueOnce({
            name: "updated beauty",
            icon: "updated icon-beauty",
            color: "updated #065705"
        });
        const findByIdAndUpdate = jest
            .spyOn(category_1.Category, "findByIdAndUpdate")
            .mockResolvedValueOnce({
            name: "updated beauty",
            icon: "updated icon-beauty",
            color: "updated #065705"
        });
        yield categoryController.updateCategory(mock_1.mockRequest, mock_1.mockResponse);
        expect(validator.matchedData).toHaveBeenCalledWith(mock_1.mockRequest);
        expect(findByIdAndUpdate).toHaveBeenCalledWith(mock_1.mockRequest.params.id, updatedCategory, { new: true });
        expect(mock_1.mockResponse.status).toHaveBeenCalledWith(200);
        expect(mock_1.mockResponse.json).toHaveBeenCalledWith({ msg: "updated successfully" });
    }));
    it("return status of 400 if category not found", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(validator, "validationResult").mockReturnValueOnce({
            isEmpty: jest.fn().mockReturnValue(true),
            array: jest.fn(), // Mock method array
            mapped: jest.fn(), // Mock method mapped
            formatWith: jest.fn(), // Mock method formatWith
            throw: jest.fn() // Mock method throw
        });
        const findByIdAndUpdate = jest
            .spyOn(category_1.Category, "findByIdAndUpdate")
            .mockResolvedValueOnce(null);
        yield categoryController.updateCategory(mock_1.mockRequest, mock_1.mockResponse);
        expect(findByIdAndUpdate).toHaveBeenCalledWith(mock_1.mockRequest.params.id, expect.any(Object), { new: true });
        expect(mock_1.mockResponse.status).toHaveBeenCalledWith(404);
        expect(mock_1.mockResponse.json).toHaveBeenCalledWith({ msg: "category not found!" });
    }));
    it("return status of 400 if there is a server error", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(validator, "validationResult").mockReturnValueOnce({
            isEmpty: jest.fn().mockReturnValue(true),
            array: jest.fn(), // Mock method array
            mapped: jest.fn(), // Mock method mapped
            formatWith: jest.fn(), // Mock method formatWith
            throw: jest.fn() // Mock method throw
        });
        const findByIdAndUpdate = jest
            .spyOn(category_1.Category, "findByIdAndUpdate")
            .mockRejectedValueOnce(new Error("Database error"));
        yield categoryController.updateCategory(mock_1.mockRequest, mock_1.mockResponse);
        expect(findByIdAndUpdate).toHaveBeenCalledWith(mock_1.mockRequest.params.id, expect.any(Object), { new: true });
        expect(mock_1.mockResponse.status).toHaveBeenCalledWith(400);
        expect(mock_1.mockResponse.json).toHaveBeenCalledWith({ error: new Error("Database error") });
    }));
});
