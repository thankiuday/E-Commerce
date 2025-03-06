import Redis from "ioredis"

// importing environment variables
import dotenv from 'dotenv';
dotenv.config();

export const redis = new Redis("rediss://default:ATJ1AAIjcDEwM2RhMzliZjcyNWM0YjRjOWM5ZTI4MjJmNGYyNTJjYXAxMA@moved-polliwog-12917.upstash.io:6379");
await redis.set('foo', 'bar');
