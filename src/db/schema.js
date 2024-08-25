import {
  pgTable,
  uuid,
  varchar,
  text,
  decimal,
  timestamp,
  pgEnum,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";

// Define the enum type for the role
export const roleEnum = pgEnum("role", ["seller", "buyer"]);

// Define the `users` table
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  role: roleEnum("role").default("buyer").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Define the `products` table
export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  sellerId: uuid("seller_id")
    .references(() => users.id)
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  discount: decimal("discount", { precision: 5, scale: 2 }).default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  thumbnail: varchar("thumbnail").notNull(),
  images: jsonb("images"),
});

// Define the `cart_items` table
export const cartItems = pgTable("cart_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  buyerId: uuid("buyer_id")
    .references(() => users.id)
    .notNull(),
  productId: uuid("product_id")
    .references(() => products.id)
    .notNull(),
  quantity: integer("quantity").default(1).notNull(),
  addedAt: timestamp("added_at").defaultNow().notNull(),
});
