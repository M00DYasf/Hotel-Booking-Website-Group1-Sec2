import dotenv from "dotenv-safe";
dotenv.config({ allowEmptyValues: true });

const ENVIRONMENT = process.env.NODE_ENV ?? "development";
const MONGO_URL = process.env.MONGO_URL ?? "";
const JWT_SECRET = process.env.JWT_SECRET ?? "";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "7d";

export const config = {
  environment: ENVIRONMENT,
  mongo: { url: MONGO_URL },
  jwt: { secret: JWT_SECRET, expiresIn: JWT_EXPIRES_IN }
};