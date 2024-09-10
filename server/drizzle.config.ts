import { defineConfig } from 'drizzle-kit'
import { env } from './src/env'

export default defineConfig({
    schema: './src/db/schema.ts', // Caminho para o arquivo que define o schema
    out: './.migrations', // Diretório para migrações
    dialect: 'postgresql', // Define o driver como PostgreSQL
    dbCredentials: {
        host: env.PGHOST,
        port: Number(env.PGPORT),
        user: env.PGUSER,
        password: env.PGPASSWORD,
        database: env.PGDATABASE,
    }
})