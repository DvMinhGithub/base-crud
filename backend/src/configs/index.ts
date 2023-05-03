export const config = {
  port: process.env.PORT ?? "8080",
  uri: process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017",
  secret: process.env.JWT_SECRET ?? "my_secret",
};

export * from "./db";

