import { fastify } from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { request } from "http";
import { createGoal } from "../functions/create-goal";
import { getWeekPendingGoals } from '../functions/get-week-pending-goals'
import z from "zod";
import { createGoalCompletion } from "../functions/create-goal-completion";
import { createGoalRoute } from "./routes/create-goal";
import { getPendingGoalsRoute } from "./routes/get-pending-goals";
import { createCompletionRoute } from "./routes/create-completion";
import { getWeekSummaryRoute } from "./routes/get-week-summary";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute)
app.register(getPendingGoalsRoute)
app.register(createCompletionRoute)
app.register(getWeekSummaryRoute)

app.listen({
    port: 3333,
}).then(() => {
    console.log('HTTP server runing!')
})