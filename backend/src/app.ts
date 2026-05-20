import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "@/routes/auth.routes";
import leadRoutes from "@/routes/lead.routes";
import { errorHandler } from "@/middlewares/error.middleware";
import { env } from "@/config/env";

const app = express();

app.use(helmet());
// Configure CORS for production using FRONTEND_ORIGIN env var (comma-separated list allowed)
const origin = env.FRONTEND_ORIGIN
	? env.FRONTEND_ORIGIN.split(",").map((s) => s.trim())
	: true;

app.use(
	cors({
		origin,
		credentials: true
	})
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => {
	res.status(200).json({ success: true, message: "OK" });
});

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.use((_req, res) => {
	res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

export default app;
