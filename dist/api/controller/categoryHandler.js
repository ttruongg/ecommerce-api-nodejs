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
exports.updateCategory = exports.deleteCategory = exports.addCategory = exports.getCategoryById = exports.getListCategory = void 0;
const category_1 = require("../model/category");
const express_validator_1 = require("express-validator");
const getListCategory = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryList = yield category_1.Category.find();
    if (!categoryList)
        response.status(400).json({ categoryList: "empty" });
    response.status(200).send(categoryList);
});
exports.getListCategory = getListCategory;
const getCategoryById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const category_id = request.params.id;
    try {
        const category = yield category_1.Category.findById(category_id);
        if (category) {
            return response.status(200).json({ sucess: true, category: category });
        }
        else {
            return response.status(404).json({ sucess: false, msg: "category not found!" });
        }
    }
    catch (error) {
        return response.status(400).json({ error: error });
    }
});
exports.getCategoryById = getCategoryById;
const addCategory = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(request);
    if (!result.isEmpty())
        return response.status(400).send({ error: result.array() });
    const data = (0, express_validator_1.matchedData)(request);
    const newCategory = new category_1.Category(data);
    try {
        const saveCategory = yield newCategory.save();
        return response.status(201).send(saveCategory);
    }
    catch (error) {
        return response.status(404).send({ error: error });
    }
});
exports.addCategory = addCategory;
const deleteCategory = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const category_id = request.params.id;
    try {
        const category = yield category_1.Category.findByIdAndDelete(category_id);
        if (category) {
            return response.status(200).json({ sucess: true, msg: "Category is deleted" });
        }
        else {
            return response.status(404).json({ sucess: false, msg: "category not found!" });
        }
    }
    catch (err) {
        return response.status(400).json({ sucess: false, error: err });
    }
});
exports.deleteCategory = deleteCategory;
const updateCategory = (request, response) => {
};
exports.updateCategory = updateCategory;
