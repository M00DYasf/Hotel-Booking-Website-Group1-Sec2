import dotenv from "dotenv-safe";

dotenv.config({ allowEmptyValues: true, path: `.env.${process.env.NODE_ENV}` });

const ENVIRONMENT = process.env.NODE_ENV ?? "development";
const MONGO_HOST = process.env.MONGO_HOST ?? "";
const MONGO_DATABASE = process.env.MONGO_DATABASE ?? "";
const MONGO_PORT = process.env.MONGO_PORT ?? "";
const MONGO_URL = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;
const JWT_SECRET = process.env.JWT_SECRET ?? "";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "7d";

export const config = {
  environment: ENVIRONMENT,
  mongo: { url: MONGO_URL },
  jwt: { secret: JWT_SECRET, expiresIn: JWT_EXPIRES_IN }
};