import z from "zod";
import prisma from "../../shared/prisma";
import app from "../../http/server";

export default async function getPollOptions() {
  app.get("/polls/:pollId/options", async (request, reply) => {
    const createOptionHeader = z.object({
      pollId: z.string().uuid(),
    });

    const { pollId } = createOptionHeader.parse(request.params);
    return reply.send(
      await prisma.pollOption.findMany({
        where: {
          pollId,
        },
      })
    );
  });
}
