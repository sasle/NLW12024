import fastify, { FastifyRequest } from "fastify";
import createPollOption from "../routes/poll-options/create-poll-option.js";
import getPollOptions from "../routes/poll-options/get-poll-options.js";
import getPolls from "../routes/polls/get-poll.js";
import createPoll from "../routes/polls/create-poll.js";
import createVote from "../routes/votes/create-vote.js";
import { fastifyCookie } from "@fastify/cookie";

const app = fastify();

app.register(fastifyCookie, {
  secret: "nlw-1-2024",
  hook: "onRequest",
});
app.register(getPolls);
app.register(createPoll);
app.register(createPollOption);
app.register(getPollOptions);
app.register(createVote);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server is running on port 3333");
  });

export default app;
