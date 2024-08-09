import { db } from "./db";
import * as schema from "./schema";

await db.insert(schema.users).values([
  {
    login: "anna-love",
    hash: await Bun.password.hash("anna-love"),
  },
]);

await db.insert(schema.users).values([
  {
    login: "test",
    hash: await Bun.password.hash("test"),
  },
]);

await db.insert(schema.items).values([
  {
    image: "test",
  },
]);

console.log(`Seeding complete.`);
