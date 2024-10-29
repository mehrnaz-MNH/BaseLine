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
  @prop({ required: true, unique: true })
  public id!: string;

  @prop({ required: true, minlength: 1 })
  public firstName!: string;

  @prop({ required: true, minlength: 1 })
  public lastName!: string;

  @prop({ required: true, minlength: 1 })
  public UserName!: string;

  @prop({ required: true, unique: true, match: /.+\@.+\..+/ })
  public email!: string;

  @prop()
  public profileComplete?: boolean;

  @prop()
  public emailVerified?: boolean;

  @prop()
  public identityVerified?: boolean;

  @prop()
  public onboardingComplete?: boolean;
}

export const User =
  (mongoose.models.UserClass as
    | ReturnModelType<typeof UserClass>
    | undefined) ?? getModelForClass(UserClass);
