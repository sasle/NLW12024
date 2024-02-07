import z from "zod";
import prisma from "../../shared/prisma";
import app from "../../http/server";

export default async function getPolls() {
  app.get("/polls", async (request, reply) => {
    return reply.send(await prisma.poll.findMany());
  });
}
