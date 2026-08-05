import express from "express";
import cors from "cors";
import routes from "./route/routes.js";


import dotenv from "dotenv";

dotenv.config();
const PORT =process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/health",(req,res)=>
{
  res.status(200).json({
   message :"health is working"
});
});



app.use("/", routes);
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});
app.listen(PORT, () =>
   {
  console.log(`server is running on ${PORT}`);
});