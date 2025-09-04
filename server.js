import express from "express";
import { PORT } from "./config/mongodb.config.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { connectToDatabase } from "./Database/mongodb.database.js";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

app.use(arcjetMiddleware);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to EventBritte API" });
});

app.get("/health", (req, res) => {
  res.send({ status: "OK" });
});

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log("Connecting Server to Database...");
  await connectToDatabase();
  console.log(`Server is running on port http://localhost:${PORT}`);
});
