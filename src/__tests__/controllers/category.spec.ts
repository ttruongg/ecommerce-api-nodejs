import { mockRequest, mockResponse } from "../utils/mock";
import * as categoryController from "../../api/controller/categoryHandler";
import { Category } from "../../api/model/category";
import * as validator from "express-validator";
import { Request } from "express-serve-static-core";
jest.mock("../../api/model/category");

jest.mock("express-validator", () => ({
    validationResult: jest.fn(() => ({
        isEmpty: jest.fn(() => false),
        array: jest.fn(() => [{ msg: "Invalid field" }]),
    })),
    matchedData: jest.fn(() => ({
        name: "name",
        icon: "icon",
        color: "#050505"

    }))
}))

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
]
describe("return list of categories", () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });
    it("should return list of categories", async () => {
        const findMethod = jest.spyOn(Category, 'find').mockResolvedValueOnce(categories);

        await categoryController.getListCategory(mockRequest, mockResponse);
        expect(findMethod).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith(categories);
    });

    it("return status of 400 when no categories found", async () => {
        const findMethod = jest.spyOn(Category, 'find').mockResolvedValueOnce([]);
        await categoryController.getListCategory(mockRequest, mockResponse);
        expect(findMethod).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ categoryList: "empty" });

    })
});

const mockCategory = {
    _id: "1",
    name: "computers",
    icon: "icon-computer",
}
describe("get category by id", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should return status of 200 and category by id", async () => {
        const findById = jest.spyOn(Category, "findById").mockResolvedValueOnce(mockCategory);
        await categoryController.getCategoryById(mockRequest, mockResponse);
        expect(findById).toHaveBeenCalledWith("1");
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ category: mockCategory });
    });
    it("return status of 404 when category not found", async () => {
        const findById = jest.spyOn(Category, "findById").mockResolvedValueOnce(null);
        await categoryController.getCategoryById(mockRequest, mockResponse);
        expect(findById).toHaveBeenCalledWith("1");
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ sucess: false, msg: "category not found!" });
    });
    it("return status of 400 and error message when an exception occur", async () => {
        const findByIdMethod = jest.spyOn(Category, 'findById').mockRejectedValueOnce(new Error("Database error"));
        await categoryController.getCategoryById(mockRequest, mockResponse);
        expect(findByIdMethod).toHaveBeenCalledWith("1");
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: new Error("Database error") });
    })
});

describe(" add new category", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    const mockRequest = {} as Request;
    it("return status of 400 when there are errors", () => {
        categoryController.addCategory(mockRequest, mockResponse);
        expect(validator.validationResult).toHaveBeenCalled();
        expect(validator.validationResult).toHaveBeenCalledWith(mockRequest);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.send).toHaveBeenCalledWith({ "error": [{ msg: "Invalid field" }] });

    });

    it("should return status of 201 when category created", async () => {
        await categoryController.addCategory(mockRequest, mockResponse);
        expect(validator.matchedData).toHaveBeenCalledWith(mockRequest);

    })

})