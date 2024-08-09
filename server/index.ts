import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { cors } from "@elysiajs/cors";

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
  .post("/sign/:name", async ({ jwt, cookie: { auth }, params }) => {
    const val = await jwt.sign(params);
    auth.set({
      value: val,
      httpOnly: true,
    });
    return val;
  })
  .listen(port);

console.log(`Listening on port ${port} ...`);
