import z from "zod";
import prisma from "../../shared/prisma";
import app from "../../http/server";

export default async function createVote() {
  app.post("/polls/:pollId/vote", async (request, reply) => {
    const createOptionBody = z.object({
      title: z.string(),
    });

    const createOptionHeader = z.object({
      pollId: z.string().uuid(),
    });

    const { title } = createOptionBody.parse(request.body);
    const { pollId } = createOptionHeader.parse(request.params);
    return reply.status(201).send(
      await prisma.pollOption.create({
        data: {
          title,
          pollId,
        },
      })
    );
  });
}
