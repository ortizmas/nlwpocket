import { pgSchema, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const mySchema = pgSchema("nlw_pocket");

// createId() o id unica e gerado pelo javascript
export const goals = mySchema.table('goals', {
    id: text('id').primaryKey()
        .$defaultFn(() => createId()),
    title: text('title').notNull(),
    desiredWeeklyFrequency: integer('desired_weekly_frequency').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
})

export const goalCompletions = mySchema.table('goal_completions', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => createId()),
    goalId: text('goal_id')
        .references(() => goals.id)
        .notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
})