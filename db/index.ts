import { config } from "dotenv";
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

config({ path: ".env" }); // or .env.local

// Create a SQL query client for Neon
const sql = neon(process.env.DATABASE_URL!);

// Export both the Drizzle client and the SQL query client
export const db = drizzle(sql, { schema });
export const query = sql;
