import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  login: text("login").unique(),
  hash: text("hash"),
  //TODO added salt
});
