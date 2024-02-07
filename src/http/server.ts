import fastify, { FastifyRequest } from "fastify";
import createPollOption from "../routes/poll-options/create-poll-option";
import getPollOptions from "../routes/poll-options/get-poll-options";
import getPolls from "../routes/polls/get-poll";
import createPoll from "../routes/polls/create-poll";

const app = fastify();
app.register(getPolls);
app.register(createPoll);
app.register(createPollOption);
app.register(getPollOptions);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server is running on port 3333");
  });

export default app;
