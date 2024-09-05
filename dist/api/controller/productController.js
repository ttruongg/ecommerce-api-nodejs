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
exports.addProduct = exports.getProductById = exports.getAll_Product = void 0;
const express_validator_1 = require("express-validator");
const product_1 = require("../model/product");
const category_1 = require("../model/category");
const getAll_Product = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const ProductList = yield product_1.Product.find().select("name image -_id");
    if (!ProductList) {
        return response.status(404).json({ success: false });
    }
    response.status(200).send(ProductList);
});
exports.getAll_Product = getAll_Product;
const getProductById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const product_id = request.params.id;
    const product = yield product_1.Product.findById(product_id);
    try {
        if (product) {
            return response.status(200).json({ success: true, product: product });
        }
        else {
            return response.status(404).json({ sucess: false, msg: "Product not found" });
        }
    }
    catch (error) {
        return response.status(400).send({ msg: error });
    }
});
exports.getProductById = getProductById;
const addProduct = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_1.Category.findById(request.body.category);
    if (!category)
        return response.status(400).send("Invalid category");
    const result = (0, express_validator_1.validationResult)(request);
    if (!result.isEmpty())
        return response.status(400).send({ error: result.array() });
    const data = (0, express_validator_1.matchedData)(request);
    const newProduct = new product_1.Product(data);
    try {
        const saveProduct = yield newProduct.save();
        return response.status(200).send(saveProduct);
    }
    catch (error) {
        return response.status(404).send({ error: error });
    }
});
exports.addProduct = addProduct;
