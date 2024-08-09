import { sqliteTable, text, integer, blob } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  login: text("login").unique().notNull(),
  hash: text("hash").notNull(),
  //TODO added salt
});

export const items = sqliteTable("items", {
  id: integer("id").primaryKey(),
  image: text("image").notNull(),
});
