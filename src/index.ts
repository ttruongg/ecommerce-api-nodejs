import express, { Express, Request, Response, Application } from "express";

const app: Application = express();
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Ecommerce-Api-Nodejs server");
});

app.listen(port, () => {
    console.log("Server is running at port: " + port);
})
