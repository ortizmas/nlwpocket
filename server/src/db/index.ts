import { drizzle } from "drizzle-orm/postgres-js";
import postgres from 'postgres';
import * as schema from "./schema";
import { env } from '../../src/env'

const conextion = {
    host: env.PGHOST,
    port: Number(env.PGPORT),
    user: env.PGUSER,
    password: env.PGPASSWORD,
    database: env.PGDATABASE,
};

export const client = postgres(conextion)
export const db = drizzle(client, { schema, logger: true })