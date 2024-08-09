import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { cors } from "@elysiajs/cors";
import { sql } from "drizzle-orm";
import * as schema from "./schema";
import { db } from "./db";

const port = 8080;

const app = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: "Anna`s word",
      exp: "7d",
    })
  )
  .use(cors({ credentials: true }))
  .post("/sign", async ({ jwt, cookie: { auth }, params, set, body }) => {
    const { login, password } = body;

    const result = await db
      .select()
      .from(schema.users)
      .where(sql`${schema.users.login} = ${login}`);

    if (
      result.length &&
      result[0].hash &&
      (await Bun.password.verify(password, result[0].hash))
    ) {
      const val = await jwt.sign(params);
      auth.set({
        value: val,
        httpOnly: true,
      });
      return val;
    }
    set.status = 400;
    return {
      success: false,
      data: null,
      message: "Invalid credentials",
    };
  })
  .listen(port);

console.log(`Listening on port ${port} ...`);
