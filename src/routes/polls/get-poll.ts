import prisma from "../../shared/prisma.js";
import app from "../../http/server.js";

export default async function getPolls() {
  app.get("/polls", async (request, reply) => {
    return reply.send(
      await prisma.poll.findMany({
        include: {
          options: {
            select: {
              title: true,
              id: true,
            },
          },
        },
      })
    );
  });
}
