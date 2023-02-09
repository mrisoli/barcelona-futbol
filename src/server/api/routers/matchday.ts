import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const matchdayRouter = createTRPCRouter({
  matchdayCreate: publicProcedure
    .input(
      z.object({
        date: z.date(),
        address: z.string(),
        location: z.string(),
        total: z.number(),
        fee: z.number(),
      })
    )
    .mutation(({ ctx, ...req }) => {
      const matchday = ctx.prisma.matchday.create({
        data: {
          date: req.input.date,
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
