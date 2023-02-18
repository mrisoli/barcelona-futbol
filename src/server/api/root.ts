import { createTRPCRouter } from "./trpc";
import { matchdayRouter } from "./routers/matchday";
import { attendanceRouter } from "./routers/attendance";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  matchday: matchdayRouter,
  attendance: attendanceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
