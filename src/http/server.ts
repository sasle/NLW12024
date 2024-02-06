import fastify, { FastifyRequest } from "fastify";
import prisma from "../shared/prisma";
import { z } from "zod";

const app = fastify();

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server is running on port 3333");
  });

app.post("/polls", async (request, reply) => {
  const createBody = z.object({
    title: z.string(),
  });

  const { title } = createBody.parse(request.body);
  return await prisma.poll.create({
    data: {
      title,
    },
  });
});
