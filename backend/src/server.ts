import app from "@/app";
import { env } from "@/config/env";
import { connectDb } from "@/config/db";

const startServer = async (): Promise<void> => {
  await connectDb();
  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
