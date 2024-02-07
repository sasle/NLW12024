import z from "zod";
import prisma from "../../shared/prisma.js";
import app from "../../http/server.js";
import { randomUUID } from "crypto";

export default async function createVote() {
  app.post("/polls/:pollId/votes", async (request, reply) => {
    const createOptionBody = z.object({
      optionId: z.string().uuid(),
    });

    const createOptionHeader = z.object({
      pollId: z.string().uuid(),
    });

    const { optionId } = createOptionBody.parse(request.body);
    const { pollId } = createOptionHeader.parse(request.params);

    let { sessionId } = request.cookies;

    if (!sessionId) {
      sessionId = randomUUID();

      reply.setCookie("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        signed: true,
        httpOnly: true,
      });
    }

    const existingVoteForThisPoll = await prisma.vote.findUnique({
      where: {
        sessionId_pollId: {
          pollId,
          sessionId,
        },
      },
    });

    if (existingVoteForThisPoll) {
      if (optionId == existingVoteForThisPoll?.pollOptionId)
        return reply
          .status(400)
          .send({ message: "You have already voted for this option." });
      else {
        await prisma.vote.delete({
          where: {
            id: existingVoteForThisPoll?.id,
          },
        });
      }
    }

    return reply.status(201).send(
      await prisma.vote.create({
        data: {
          sessionId,
          pollOptionId: optionId,
          pollId,
        },
      })
    );
  });
}
