import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { User } from "@acme/db";

import { publicProcedure } from "../trpc";

export const CreateUserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  UserName: z.string(),
  email: z.string().email("Invalid email address"),
  profileComplete: z.boolean(),
  emailVerified: z.boolean(),
  identityVerified: z.boolean(),
  onboardingComplete: z.boolean(),
  verificationCode: z.string(),
});

export const UpdateUserSchema = z.object({
  id: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  UserName: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  profileComplete: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  identityVerified: z.boolean().optional(),
  onboardingComplete: z.boolean().optional(),
  verificationCode: z.string().optional(),
});

export const userRouter = {
  all: publicProcedure.query(async () => {
    const users = await User.find().limit(10);

    return users;
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const user = await User.findOne({ id: input.id });

      if (!user) return null;

      return user;
    }),

  create: publicProcedure
    .input(CreateUserSchema)
    .mutation(async ({ input }) => {
      const user = await User.create(input);
      return user;
    }),

  update: publicProcedure
    .input(UpdateUserSchema)
    .mutation(async ({ input }) => {
      const { id, ...updatedFields } = input;
      const updatedUser = await User.findOneAndUpdate(
        { id: id },
        updatedFields,
        {
          new: true,
          runValidators: true,
        },
      );

      if (!updatedUser) {
        throw new Error("User not found");
      }

      return updatedUser;
    }),
} satisfies TRPCRouterRecord;
