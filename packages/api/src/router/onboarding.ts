import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { User } from "@acme/db";

import { protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = {
  all: publicProcedure.query(async () => {
    const users = await User.find().limit(10);

    return users;
  }),
} satisfies TRPCRouterRecord;
