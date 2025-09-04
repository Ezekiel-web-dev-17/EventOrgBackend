import express from "express";
import { PORT } from "./config/mongodb.config";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

app.get("/health", (req, res) => {
  res.send({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
