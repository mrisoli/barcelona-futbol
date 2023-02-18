import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const matchdayRouter = createTRPCRouter({
  matchdayCreate: protectedProcedure
    .input(
      z.object({
        date: z.number(),
        address: z.string(),
        location: z.string(),
        total: z.number(),
        fee: z.number(),
      })
    )
    .mutation(({ ctx, ...req }) => {
      const dateSchema = z.date().min(new Date());
      const date = dateSchema.parse(new Date(req.input.date));
      const matchday = ctx.prisma.matchday.create({
        data: {
          date,
          address: req.input.address,
          location: req.input.location,
          total: req.input.total,
          fee: req.input.fee,
        },
      });
      return matchday;
    }),
  nextMatchday: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.matchday.findFirst({
      where: {
        date: {
          gt: new Date(),
        },
      },
      orderBy: {
        date: "asc",
      },
    });
  }),
});
