import path from "path";
import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import morgan from "morgan";
import connectDB from "./config/db.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import colors from "colors";
import mail from "./routes/mail.js";

dotenv.config();
connectDB();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/trans", transactionRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/mail", mail);
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "build/index.html"))
);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
