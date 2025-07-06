import express from "express";
import dotenv from "dotenv";
const cors = require("cors");
import todoRoutes from "./routes/todos";
import { testConnection } from "./db";
//load env variable
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/api/todos", todoRoutes);
testConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
