import express from "express";
import dotenv from "dotenv-safe";
import cors from "cors";
import authRoutes from "./ports/rest/routes/auth";
import adminRoutes from "./ports/rest/routes/admin";
import dependencies from "./infrastructure/dependencies";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

dotenv.config();

const { mongoDbClient } = dependencies;
mongoDbClient.ConnectToDb();

app.use("/healthcheck", (_req, res) => {
  res.status(200).json({ message: "Successful" });
});

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

const desiredPort = Number(process.env.PORT ?? 8000);
const server = app.listen(desiredPort, () => {
  const addr = server.address();
  const actualPort = typeof addr === "object" && addr ? addr.port : desiredPort;
  console.log(`Server listening on http://localhost:${actualPort}`);
});

export default app;