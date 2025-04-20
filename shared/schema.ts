import { pgTable, text, serial, integer, boolean, doublePrecision, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Product table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  price: doublePrecision("price").notNull(),
  image: text("image").notNull(),
  images: text("images").array(),
  rating: doublePrecision("rating").notNull().default(5),
  reviewCount: integer("review_count").notNull().default(0),
  installments: integer("installments").notNull().default(10),
  category: text("category").notNull(),
  featured: boolean("featured").default(false),
  stock: integer("stock").notNull().default(10),
  sizes: text("sizes").array(),
  colors: text("colors").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Category table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  image: text("image").notNull(),
});

// Order table
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").notNull(),
  status: text("status").notNull().default("pending"),
  total: doublePrecision("total").notNull(),
  items: jsonb("items").notNull(),
  shippingAddress: jsonb("shipping_address").notNull(),
  paymentMethod: text("payment_method").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Customer table
export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  cpf: text("cpf"),
});

// Schemas
export const insertProductSchema = createInsertSchema(products).omit({ id: true, createdAt: true });
export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true });
export const insertCustomerSchema = createInsertSchema(customers).omit({ id: true });

// Types
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

export type Customer = typeof customers.$inferSelect;
export type InsertCustomer = z.infer<typeof insertCustomerSchema>;
