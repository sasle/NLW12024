import z from "zod";
import prisma from "../../shared/prisma";
import app from "../../http/server";

export default async function createPoll() {
  app.post("/polls", async (request, reply) => {
    const createOptionBody = z.object({
      title: z.string(),
      options: z.array(z.string()),
    });

    const { title, options } = createOptionBody.parse(request.body);
    return reply.status(201).send(
      await prisma.poll.create({
        data: {
          title,
          options: {
            createMany: {
              data: options.map((option) => {
                return { title: option };
              }),
            },
          },
        },
      })
    );
  });
}
