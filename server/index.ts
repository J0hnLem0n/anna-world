import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { cors } from "@elysiajs/cors";
import { eq } from "drizzle-orm";
import * as schema from "./schema";
import { db } from "./db";
import { staticPlugin } from "@elysiajs/static";

const port = 8080;
const protocol = "http";
let baseUrl = "";

const app = new Elysia().listen(port);
baseUrl = `${protocol}://${app.server?.hostname}:${app.server?.port}`;

app
  .use(
    jwt({
      name: "jwt",
      secret: "Anna`s word",
      exp: "7d",
    })
  )
  .use(cors({ credentials: true }))
  .use(staticPlugin())
  .post("/sign", async ({ jwt, cookie: { auth }, params, set, body }) => {
    const { login, password } = body;
    console.log(body);
    const user = await db.query.users.findFirst({
      where: eq(schema.users.login, login),
    });

    if (user && (await Bun.password.verify(password, user.hash))) {
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
  .get("/items", async () => {
    // console.dir(Bun.file("public/table.png"));

    return (await db.select().from(schema.items)).map((i) => ({
      ...i,
      image: baseUrl + i.image,
    }));
  });

console.log(`Listening ${baseUrl}`);
