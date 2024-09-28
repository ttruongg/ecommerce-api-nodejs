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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validationSchema_1 = require("../utils/validationSchema");
const productController = __importStar(require("../controller/productController"));
const router = (0, express_1.Router)();
router.get("/", productController.getAll_Product);
router.get("/:id", productController.getProductById);
router.post("/", (0, express_validator_1.checkSchema)(validationSchema_1.product_Schema), productController.addProduct);
router.put("/:id", (0, express_validator_1.checkSchema)(validationSchema_1.product_Schema), productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.get("/get/count", productController.countProduct);
router.get("/featured/:count", productController.productsFeatured);
exports.default = router;
