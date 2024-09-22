import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { cors } from "@elysiajs/cors";
import { eq } from "drizzle-orm";
import * as schema from "./schema";
import { db } from "./db";
import { staticPlugin } from "@elysiajs/static";
import crypto from "crypto";

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
  .post(
    "/item",
    async ({ body, redirect }) => {
      const fileName = body.file.name;
      if (!fileName) throw new Error("Must upload a file.");
      await Bun.write(
        `public/${crypto.randomUUID()}.${fileName.split(".").pop()}`,
        body.file
      );
      // return { res: "/" };
      return redirect("http://localhost:3000/upload.html");
    },
    {
      body: t.Object({
        file: t.File(),
      }),
    }
  )
  .get("/items", async () => {
    return (await db.select().from(schema.items)).map((i) => ({
      ...i,
      image: baseUrl + i.image,
    }));
  });

console.log(`Listening ${baseUrl}`);
