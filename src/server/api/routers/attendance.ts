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
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const attendance = await ctx.prisma.attendance.create({
        data: {
          matchdayId: input,
          userId: ctx.session.user.id,
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
  getDebts: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.attendance.findMany({
      where: { userId: ctx.session.user.id, paid: false },
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
