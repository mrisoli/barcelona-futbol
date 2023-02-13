import { z } from "zod";
import { publicProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

export const attendanceRouter = createTRPCRouter({
  getAttendancesForMatchday: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const attendances = await ctx.prisma.attendance.findMany({
        where: {
          matchdayId: input,
        },
      });
      return attendances;
    }),
  checkIn: protectedProcedure
    .input(
      z.object({
        matchdayId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const attendance = await ctx.prisma.attendance.create({
        data: {
          matchdayId: input.matchdayId,
          userId: input.userId,
        },
      });
      return attendance;
    }),
  checkOut: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.attendance.delete({
        where: {
          id: input,
        },
      });
      return {};
    }),
  markAsPaid: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.attendance.update({
        where: { id: input },
        data: {
          paid: true,
        },
      });
      return {};
    }),
  getDebts: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.attendance.findMany({
        where: { userId: input, paid: false },
      });
    }),
  getDebtors: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.attendance.findMany({
      where: {
        paid: false,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }),
});
