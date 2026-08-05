import express from "express";
import cors from "cors";
import routes from "./route/routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", routes);

app.listen(3002, () =>
   {
  console.log("Server running on port 3002");
});