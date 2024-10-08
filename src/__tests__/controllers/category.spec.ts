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
        name: "computers",
        icon: "icon-computer",
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
    name: "computers",
    icon: "icon-computer",
    color: "#050505"
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
        const findByIdMethod = jest
            .spyOn(Category, 'findById')
            .mockRejectedValueOnce(new Error("Database error"));
        await categoryController.getCategoryById(mockRequest, mockResponse);
        expect(findByIdMethod).toHaveBeenCalledWith("1");
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: new Error("Database error") });
    })
});

describe("add new category", () => {
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

        jest.spyOn(validator, "validationResult").mockReturnValueOnce({
            isEmpty: jest.fn().mockReturnValue(true),
            array: jest.fn(),  // Mock method array
            mapped: jest.fn(), // Mock method mapped
            formatWith: jest.fn(), // Mock method formatWith
            throw: jest.fn()  // Mock method throw
        } as unknown as validator.Result<validator.ValidationError>);

        const saveMethod = jest
            .spyOn(Category.prototype, "save")
            .mockResolvedValueOnce({
                id: 1,
                name: "computers",
                icon: "icon-computer",
                color: "#050505"
            });

        await categoryController.addCategory(mockRequest, mockResponse);
        expect(validator.matchedData).toHaveBeenCalled();
        expect(validator.matchedData).toHaveBeenCalledWith(mockRequest);
        expect(Category).toHaveBeenCalledWith({
            name: "computers",
            icon: "icon-computer",
            color: "#050505"
        });
        expect(saveMethod).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.send).toHaveBeenCalledWith({
            id: 1,
            name: "computers",
            icon: "icon-computer",
            color: "#050505"
        });



    });

    it("return status of 400 when database fails to save category", async () => {
        jest.spyOn(validator, "validationResult").mockReturnValueOnce({
            isEmpty: jest.fn().mockReturnValue(true),
            array: jest.fn(),  // Mock method array
            mapped: jest.fn(), // Mock method mapped
            formatWith: jest.fn(), // Mock method formatWith
            throw: jest.fn()  // Mock method throw
        } as unknown as validator.Result<validator.ValidationError>);


        const saveMethod = jest
            .spyOn(Category.prototype, "save")
            .mockImplementationOnce(() => Promise.reject("fail to save category"));
        await categoryController.addCategory(mockRequest, mockResponse);
        expect(saveMethod).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.send).toHaveBeenCalledWith({ error: "fail to save category" });
    });

});

describe("delete category", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("status of 200 when delete successfully", async () => {
        const findByIdAndDelete = jest
            .spyOn(Category, "findByIdAndDelete")
            .mockResolvedValueOnce({
                id: "1",
                name: "tablet",
                icon: "icon-tablet",
                color: "#050505"
            });
        await categoryController.deleteCategory(mockRequest, mockResponse);
        expect(findByIdAndDelete).toHaveBeenCalledWith(mockRequest.params.id);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ sucess: true, msg: "Category is deleted" });
    });

    it("return status of 404 when user not found", async () => {
        const findByIdAndDelete = jest
            .spyOn(Category, "findByIdAndDelete")
            .mockResolvedValueOnce(null)

        await categoryController.deleteCategory(mockRequest, mockResponse);
        expect(findByIdAndDelete).toHaveBeenCalledWith(mockRequest.params.id);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ sucess: false, msg: "category not found!" });
    });

    it("return status of 400 when fails to delete category", async () => {
        const findByIdAndDelete = jest
            .spyOn(Category, "findByIdAndDelete")
            .mockRejectedValueOnce(new Error("Database error"));

        await categoryController.deleteCategory(mockRequest, mockResponse);
        expect(findByIdAndDelete).toHaveBeenCalledWith(mockRequest.params.id);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            sucess: false,
            error: new Error("Database error")
        });
    });
});

describe("update category", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("return status of 400 if there are validation errors", async () => {
        await categoryController.updateCategory(mockRequest, mockResponse);
        expect(validator.validationResult).toHaveBeenCalled();
        expect(validator.validationResult).toHaveBeenCalledWith(mockRequest);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ "error": [{ msg: "Invalid field" }] });
    });

    it("should update category and return status of 200 if successful", async () => {
        jest.spyOn(validator, "validationResult").mockReturnValueOnce({
            isEmpty: jest.fn().mockReturnValue(true),
            array: jest.fn(),  // Mock method array
            mapped: jest.fn(), // Mock method mapped
            formatWith: jest.fn(), // Mock method formatWith
            throw: jest.fn()  // Mock method throw
        } as unknown as validator.Result<validator.ValidationError>);


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
            .spyOn(Category, "findByIdAndUpdate")
            .mockResolvedValueOnce({
                name: "updated beauty",
                icon: "updated icon-beauty",
                color: "updated #065705"
            });
        await categoryController.updateCategory(mockRequest, mockResponse);
        expect(validator.matchedData).toHaveBeenCalledWith(mockRequest);
        expect(findByIdAndUpdate).toHaveBeenCalledWith(mockRequest.params.id, updatedCategory, { new: true });
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: "updated successfully" });
    });

    it("return status of 400 if category not found", async () => {
        jest.spyOn(validator, "validationResult").mockReturnValueOnce({
            isEmpty: jest.fn().mockReturnValue(true),
            array: jest.fn(),  // Mock method array
            mapped: jest.fn(), // Mock method mapped
            formatWith: jest.fn(), // Mock method formatWith
            throw: jest.fn()  // Mock method throw
        } as unknown as validator.Result<validator.ValidationError>);

        const findByIdAndUpdate = jest
            .spyOn(Category, "findByIdAndUpdate")
            .mockResolvedValueOnce(null);

        await categoryController.updateCategory(mockRequest, mockResponse);

        expect(findByIdAndUpdate).toHaveBeenCalledWith(mockRequest.params.id, expect.any(Object), { new: true });
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: "category not found!" });
    });

    it("return status of 400 if there is a server error", async () => {
        jest.spyOn(validator, "validationResult").mockReturnValueOnce({
            isEmpty: jest.fn().mockReturnValue(true),
            array: jest.fn(),  // Mock method array
            mapped: jest.fn(), // Mock method mapped
            formatWith: jest.fn(), // Mock method formatWith
            throw: jest.fn()  // Mock method throw
        } as unknown as validator.Result<validator.ValidationError>);


        const findByIdAndUpdate = jest
            .spyOn(Category, "findByIdAndUpdate")
            .mockRejectedValueOnce(new Error("Database error"));

        await categoryController.updateCategory(mockRequest, mockResponse);

        expect(findByIdAndUpdate).toHaveBeenCalledWith(mockRequest.params.id, expect.any(Object), { new: true });
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: new Error("Database error") });
    });




})
