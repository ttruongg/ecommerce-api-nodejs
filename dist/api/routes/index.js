"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_1 = __importDefault(require("./category"));
const product_1 = __importDefault(require("./product"));
const user_1 = __importDefault(require("./user"));
const authentication_1 = __importDefault(require("./authentication"));
const api = process.env.API_URL;
const router = (0, express_1.Router)();
router.use(`${api}/categories`, category_1.default);
router.use(`${api}/products`, product_1.default);
router.use(`${api}/users`, user_1.default);
router.use(authentication_1.default);
exports.default = router;
