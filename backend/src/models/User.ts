import { Schema, model, Types } from "mongoose";
import { IUser, UserRole } from "@/types/user";

export interface UserDocument extends Omit<IUser, "_id"> {
  _id: Types.ObjectId;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.Sales
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const UserModel = model<UserDocument>("User", UserSchema);
