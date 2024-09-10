import z from "zod";

const envSchema = z.object({
    // DATABASE_URL: z.string().url(),
    PGHOST: z.string().min(1, "O host é obrigatório"),        // Endereço do host do banco de dados
    PGPORT: z.string().min(1, "Porta deve ser um número positivo"), // Porta do banco de dados
    PGUSER: z.string().min(1, "O usuário é obrigatório"),     // Usuário do banco de dados
    PGPASSWORD: z.string().min(1, "A senha é obrigatória"),   // Senha do banco de dados
    PGDATABASE: z.string().min(1, "O nome do banco de dados é obrigatório"), // Nome do banco de dados
    PGSCHEMA: z.string().min(1, "O schema é obrigatório").default("public"), // Schema padrão é 'public'
})

export const env = envSchema.parse(process.env)