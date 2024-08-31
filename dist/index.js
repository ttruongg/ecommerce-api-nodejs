"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv/config");
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./api/routes/index"));
const app = (0, express_1.default)();
const { PORT, CONNECTION_STRING } = process.env;
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)("tiny"));
app.use(index_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to Ecommerce-Api-Nodejs server");
});
app.listen(PORT, () => {
    console.log("Server is running at port: " + PORT);
});
if (!CONNECTION_STRING) {
    throw new Error("Database connection string is not defined");
}
mongoose_1.default.connect(CONNECTION_STRING)
    .then(() => console.log("Connected to Database"))
    .catch((error) => { console.log(`Error: ${error}`); });
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
