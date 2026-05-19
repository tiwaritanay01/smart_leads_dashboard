import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "@/routes/auth.routes";
import { errorHandler } from "@/middlewares/error.middleware";

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => {
	res.status(200).json({ success: true, message: "OK" });
});

app.use("/api/auth", authRoutes);

app.use((_req, res) => {
	res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

export default app;
