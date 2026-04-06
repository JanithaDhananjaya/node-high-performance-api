import { createClient } from "redis";

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: 6379,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

await redisClient.connect();
console.log('Redis Connected..');

export default redisClient;