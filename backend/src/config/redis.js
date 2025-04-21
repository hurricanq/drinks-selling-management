import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

console.log('Redis URL:', process.env.UPSTASH_REDIS_URL);

export const redis = new Redis(process.env.UPSTASH_REDIS_URL, {
    tls: {
      rejectUnauthorized: false
        }
});
    
redis.on('error', (err) => {
    console.error('Redis Client Error', err);
});
    
redis.on('connect', () => {
    console.log('Connected to Redis');
});