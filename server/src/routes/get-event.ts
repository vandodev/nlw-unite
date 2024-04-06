import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function getEvent(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/events/:eventId', {
      schema: {
        params: z.object({ 
          eventId: z.string().uuid(),
        }),
        response: { },
      }
    }, async (request, reply) => {
      const { eventId } = request.params

      const event = await prisma.event.findUnique({
        select: {
            id: true,
            title: true,
            slug: true,
            details: true,
            maximumAttendees: true,
            _count: {
              select: {
                attendees: true,
              }
            },
          },
        where: {
          id: eventId,
        }
      })

      if (event === null) {
        throw new Error('Event not found.')
      }

      return reply.send({ event})
    })
}