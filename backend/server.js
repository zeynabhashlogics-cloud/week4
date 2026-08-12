import express from "express";
import cors from "cors";
import routes from "./route/routes.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3002;

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL,}));
app.use(express.json());

app.get("/health", (req, res) =>
   {
  res.status(200).json({
    message: "health works",
  });
});

app.use("/", routes);

app.use((req, res) => 
  {
  res.status(404).json({
    message: "Route not found",
  });
});

app.listen(PORT, () => 
  {
  console.log(`Server is running on ${PORT}`);
});