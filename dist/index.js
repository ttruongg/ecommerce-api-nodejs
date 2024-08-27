"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv/config");
const app = (0, express_1.default)();
const { PORT, API_URL } = process.env;
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.send("Welcome to Ecommerce-Api-Nodejs server");
});
app.listen(PORT, () => {
    console.log("Server is running at port: " + PORT);
});
app.get("/api/v1/products", (request, response) => {
    const product = {
        id: 1,
        name: "hair dresser",
        image: "img_url"
    };
    response.send(product);
});
app.get("/test", (request, response) => {
    response.send({ msg: "Hello hello" });
});
