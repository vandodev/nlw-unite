import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function getEventAttendees(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/events/:eventId/attendees', {
      schema: {
        params: z.object({
          eventId: z.string().uuid(),
        }),        
        querystring: z.object({
          pageIndex: z.string().nullish().default('0').transform(Number),
        }),
        response: {
          200: z.object({
            attendees: z.array(
              z.object({
                id: z.number(),
                name: z.string(),
                email: z.string().email(),
                createdAt: z.date(),
              })
            ),
          }),
        },
      }
    }, async (request, reply) => {
      const { eventId } = request.params
      const { pageIndex } = request.query

      const attendees = await prisma.attendee.findMany({
        where:{
          eventId
        },
        take:10,   
        skip: pageIndex * 10,
      })      

      return reply.send({attendees })
    })
}