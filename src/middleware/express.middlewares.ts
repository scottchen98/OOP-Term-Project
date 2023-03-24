import express from "express";
import path from "path";
import session, { MemoryStore } from "express-session";
import morgan from "morgan";
require("dotenv").config();
import connectRedis from "connect-redis";
const Redis = require("ioredis");

module.exports = (app: express.Application) => {
  // Static File Serving and Post Body Parsing
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.urlencoded({ extended: true }));
  app.set("views", path.join(__dirname, "..", "areas"));
  app.set("view engine", "ejs");

  // Logging Middleware
  app.use(morgan("tiny"));

  //===== Configure Redis ======//
  // Initialize Client
  const redisClient = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  });

  // Initialize store.
  const RedisStore = connectRedis(session);

  // Session Configuration
  app.use(
    session({
      store: process.env.NODE_ENV === "production" ? new RedisStore({ client: redisClient }) : new MemoryStore(),
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );
};
