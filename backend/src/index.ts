import express from "express";
import dotenv from "dotenv";
import todoRoutes from "./routes/todos";
import { testConnection } from "./db";
//load env variable
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/api/todos", todoRoutes);
testConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
