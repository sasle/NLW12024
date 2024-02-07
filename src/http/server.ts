import fastify, { FastifyRequest } from "fastify";
import createPoll from "../routes/create-poll";
import createPollOption from "../routes/create-poll-option";

const app = fastify();
app.register(createPoll);
app.register(createPollOption);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server is running on port 3333");
  });

export default app;
