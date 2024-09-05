"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_1 = __importDefault(require("./category"));
const product_1 = __importDefault(require("./product"));
const router = (0, express_1.Router)();
router.use(category_1.default);
router.use(product_1.default);
exports.default = router;
