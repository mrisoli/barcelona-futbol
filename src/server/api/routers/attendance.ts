import { z } from "zod";
import { publicProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

export const attendanceRouter = createTRPCRouter({
  checkIn: publicProcedure.input({}).mutation(({ ctx, ...req }) => {
    return {};
  }),
  checkOut: publicProcedure.input({}).mutation(({ ctx, ...req }) => {
    return {};
  }),
});
