import express, { Request, Response, Application, request } from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import morgan from "morgan";
import mongoose from "mongoose";
const app: Application = express();

const { PORT, API_URL, CONNECTTION_STRING } = process.env;

app.use(bodyParser.json());
app.use(morgan("tiny"));
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Ecommerce-Api-Nodejs server");
});

app.listen(PORT, () => {
  console.log("Server is running at port: " + PORT);
});

if (!CONNECTTION_STRING) {
  throw new Error("Database connection string is not defined");
}

mongoose.connect(CONNECTTION_STRING)
  .then(() => console.log("Connected to Database"))
  .catch((error: Error) => { console.log(`Error: ${error}`) })



app.get("/api/v1/products", (request: express.Request, response: Response) => {
  const product = {
    id: 1,
    name: "hair dresser",
    image: "img_url"
  }
  response.send(product);

});

app.get("/test", (request: Request, response: Response) => {
  response.send({ msg: "Hello hello" });
})


