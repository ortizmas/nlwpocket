import { fastify } from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { request } from "http";
import { createGoal } from "../functions/create-goal";
import { getWeekPendingGoals } from '../functions/get-week-pending-goals'
import z from "zod";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.post('/goals', {
    schema: {
        body: z.object({
            title: z.string(),
            desiredWeeklyFrequency: z.number().int().min(1).max(7),
        }),
    }
},
    async (request) => {
        const { title, desiredWeeklyFrequency } = request.body
        await createGoal({
            title,
            desiredWeeklyFrequency
        })
    })

app.get('/pending-goals', async () => {
    const { pendingGoals } = await getWeekPendingGoals()

    return { pendingGoals }
})

app.listen({
    port: 3333,
}).then(() => {
    console.log('HTTP server runing!')
})