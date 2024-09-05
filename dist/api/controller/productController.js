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
exports.productsFeatured = exports.countProduct = exports.deleteProduct = exports.updateProduct = exports.addProduct = exports.getProductById = exports.getAll_Product = void 0;
const express_validator_1 = require("express-validator");
const product_1 = require("../model/product");
const category_1 = require("../model/category");
const getAll_Product = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    // localhost:8000/api/v1/products?categories=, 12312346464
    let filter = {};
    if (typeof request.query.categories === 'string') {
        filter = { category: request.query.categories.split(',').map(category => category.trim()) };
    }
    const ProductList = yield product_1.Product.find(filter).populate("category");
    if (!ProductList) {
        return response.status(404).json({ success: false });
    }
    response.status(200).send(ProductList);
});
exports.getAll_Product = getAll_Product;
const getProductById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const product_id = request.params.id;
    const product = yield product_1.Product.findById(product_id).populate("category");
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
const updateProduct = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_1.Category.findById(request.body.category);
    if (!category)
        return response.status(400).send("Invalid category");
    const result = (0, express_validator_1.validationResult)(request);
    if (!result.isEmpty())
        return response.status(400).send({ error: result.array() });
    const id = request.params.id;
    const data = (0, express_validator_1.matchedData)(request);
    try {
        const product = yield product_1.Product.findByIdAndUpdate(id, data, { new: true });
        if (product) {
            return response.status(200).send({ sucess: true, product: product });
        }
        else {
            return response.status(404).send({ sucess: false, msg: "product not found" });
        }
    }
    catch (error) {
        return response.status(400).send({ msg: error });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    try {
        const product = yield product_1.Product.findByIdAndDelete(id);
        return product ?
            response.status(200).send({ msg: "deleted successfully" }) :
            response.status(404).send({ msg: "product not found" });
    }
    catch (error) {
        return response.status(400).send({ err: error });
    }
});
exports.deleteProduct = deleteProduct;
const countProduct = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const productCount = yield product_1.Product.countDocuments();
    if (!productCount) {
        return response.status(500).send({ success: false });
    }
    response.status(200).send({
        productCount: productCount
    });
});
exports.countProduct = countProduct;
const productsFeatured = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const count = request.params.count ? request.params.count : 0;
    const featuredList = yield product_1.Product.find({ isFeatured: true }).limit(+count);
    if (!featuredList)
        return response.status(500).send({ success: false });
    response.status(200).send(featuredList);
});
exports.productsFeatured = productsFeatured;
