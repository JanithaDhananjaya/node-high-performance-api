import RedisStore from "rate-limit-redis";
import rateLimit from "express-rate-limit";
import redisClient from "../config/redis.js";

const limiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
    }),
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: {
        statusCode: 429,
        message: "Too many requests from this IP, please try again after 15 minutes.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export default limiter;