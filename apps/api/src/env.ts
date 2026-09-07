import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  API_PORT: z.coerce.number().int().positive().default(5000),
  DATABASE_URL: z.string().min(1),
  RABBITMQ_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
});

export const env = envSchema.parse(process.env);
