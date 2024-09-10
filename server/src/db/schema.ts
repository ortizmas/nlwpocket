import { pgSchema, text, integer, timestamp } from "drizzle-orm/pg-core";

export const mySchema = pgSchema("nlw_pocket");

export const goals = mySchema.table('goals', {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    desiredWeeklyFrequency: integer('desired_weekly_frequency').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
})