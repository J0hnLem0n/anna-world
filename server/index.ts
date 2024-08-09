import { type BodyInit, type ResponseInit } from "undici-types";

export class ClientResponse extends Response {
  constructor(body?: BodyInit, init?: ResponseInit) {
    super(body, init);
    this.headers.set("Access-Control-Allow-Origin", "*");
    this.headers.set("Access-Control-Allow-Methods", "OPTIONS, GET");
    this.headers.set("Access-Control-Allow-Headers", "Content-Type");
  }
}

const server = Bun.serve({
  port: 8080,
  fetch(req) {
    return new ClientResponse("Bun!");
  },
});
console.log(`Listening on ${server.hostname} port ${server.port} ...`);
