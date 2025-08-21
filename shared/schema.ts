import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb, integer, real, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  userType: text("user_type").notNull(), // customer, enterprise, operator
  fullName: text("full_name"),
  companyName: text("company_name"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const customerProfiles = pgTable("customer_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  fullName: text("full_name").notNull(),
  mobile: text("mobile").notNull(),
  email: text("email").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  pincode: text("pincode").notNull(),
  kycStatus: text("kyc_status").default("pending"), // pending, verified, rejected
  createdAt: timestamp("created_at").defaultNow(),
});

export const documents = pgTable("documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  documentType: text("document_type").notNull(), // aadhaar, pan, passport
  documentNumber: text("document_number"),
  filePath: text("file_path").notNull(),
  extractedData: jsonb("extracted_data"),
  verificationStatus: text("verification_status").default("pending"),
  aiConfidence: real("ai_confidence"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const faceVerifications = pgTable("face_verifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  verificationStatus: text("verification_status").default("pending"),
  livenessScore: real("liveness_score"),
  matchScore: real("match_score"),
  fraudFlags: jsonb("fraud_flags"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const simActivations = pgTable("sim_activations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  simNumber: text("sim_number").notNull(),
  simType: text("sim_type").notNull(), // physical, esim, dongle
  planId: varchar("plan_id").notNull(),
  activationStatus: text("activation_status").default("pending"),
  activationId: text("activation_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const plans = pgTable("plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(), // basic, premium, enterprise
  price: integer("price").notNull(),
  dataLimit: text("data_limit").notNull(),
  features: jsonb("features"),
  isRecommended: boolean("is_recommended").default(false),
});

export const enterpriseProfiles = pgTable("enterprise_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  companyName: text("company_name").notNull(),
  contactPerson: text("contact_person").notNull(),
  businessType: text("business_type"),
  employeeCount: integer("employee_count"),
  monthlyBudget: integer("monthly_budget"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const employees = pgTable("employees", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  enterpriseId: varchar("enterprise_id").references(() => enterpriseProfiles.id).notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  mobile: text("mobile"),
  simNumber: text("sim_number"),
  planId: varchar("plan_id"),
  activationStatus: text("activation_status").default("pending"),
  kycStatus: text("kyc_status").default("pending"),
  dataUsage: text("data_usage"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const fraudAlerts = pgTable("fraud_alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  alertType: text("alert_type").notNull(), // deepfake, duplicate_document, unusual_activity
  severity: text("severity").notNull(), // critical, high, medium, low
  description: text("description").notNull(),
  confidence: real("confidence"),
  status: text("status").default("active"), // active, reviewed, dismissed
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertCustomerProfileSchema = createInsertSchema(customerProfiles).omit({ id: true, createdAt: true });
export const insertDocumentSchema = createInsertSchema(documents).omit({ id: true, createdAt: true });
export const insertFaceVerificationSchema = createInsertSchema(faceVerifications).omit({ id: true, createdAt: true });
export const insertSimActivationSchema = createInsertSchema(simActivations).omit({ id: true, createdAt: true });
export const insertPlanSchema = createInsertSchema(plans).omit({ id: true });
export const insertEnterpriseProfileSchema = createInsertSchema(enterpriseProfiles).omit({ id: true, createdAt: true });
export const insertEmployeeSchema = createInsertSchema(employees).omit({ id: true, createdAt: true });
export const insertFraudAlertSchema = createInsertSchema(fraudAlerts).omit({ id: true, createdAt: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type CustomerProfile = typeof customerProfiles.$inferSelect;
export type InsertCustomerProfile = z.infer<typeof insertCustomerProfileSchema>;
export type Document = typeof documents.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type FaceVerification = typeof faceVerifications.$inferSelect;
export type InsertFaceVerification = z.infer<typeof insertFaceVerificationSchema>;
export type SimActivation = typeof simActivations.$inferSelect;
export type InsertSimActivation = z.infer<typeof insertSimActivationSchema>;
export type Plan = typeof plans.$inferSelect;
export type InsertPlan = z.infer<typeof insertPlanSchema>;
export type EnterpriseProfile = typeof enterpriseProfiles.$inferSelect;
export type InsertEnterpriseProfile = z.infer<typeof insertEnterpriseProfileSchema>;
export type Employee = typeof employees.$inferSelect;
export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
export type FraudAlert = typeof fraudAlerts.$inferSelect;
export type InsertFraudAlert = z.infer<typeof insertFraudAlertSchema>;
