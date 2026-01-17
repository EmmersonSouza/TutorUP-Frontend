import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("student"),
  fullName: text("full_name"),
  phone: text("phone"),
  birthDate: text("birth_date"),
  cpf: text("cpf"),
  education: text("education"),
  educationArea: text("education_area"),
  institution: text("institution"),
  experienceYears: text("experience_years"),
  bio: text("bio"),
  subjects: text("subjects").array(),
  hourlyRate: text("hourly_rate"),
});

export const invitations = pgTable("invitations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  token: text("token").notNull().unique(),
  email: text("email").notNull(),
  inviterName: text("inviter_name").notNull(),
  expiresAt: text("expires_at").notNull(),
  status: text("status").notNull().default("pending"),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertInvitationSchema = createInsertSchema(invitations).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertInvitation = z.infer<typeof insertInvitationSchema>;
export type Invitation = typeof invitations.$inferSelect;
