import { fastify } from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { request } from "http";
import { createGoal } from "../functions/create-goal";
import { getWeekPendingGoals } from '../functions/get-week-pending-goals'
import z from "zod";
import { createGoalCompletion } from "../functions/create-goal-completion";

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

app.post('/completions', {
    schema: {
        body: z.object({
            goalId: z.string(),
        }),
    }
},
    async (request) => {
        const { goalId } = request.body
        const result = await createGoalCompletion({
            goalId
        })

        return result
    })

app.listen({
    port: 3333,
}).then(() => {
    console.log('HTTP server runing!')
})