import {
  getModelForClass,
  modelOptions,
  mongoose,
  prop,
  ReturnModelType,
} from "@typegoose/typegoose";

/**
 * This collection is used by NextAuth to store user information.
 * This must contain the user's name, email, image, and email verification status.
 */
@modelOptions({ schemaOptions: { collection: "users" } })
export class UserClass {
  @prop()
  public firstName?: string;

  @prop()
  public lastName?: string;

  @prop()
  public email?: string;

  @prop()
  public emailVerified?: boolean;

  @prop()
  public onboardingComplete?: boolean;
}

export const User =
  (mongoose.models.UserClass as
    | ReturnModelType<typeof UserClass>
    | undefined) ?? getModelForClass(UserClass);
