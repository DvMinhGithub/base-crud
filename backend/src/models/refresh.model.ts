import { Schema, model, Document, ObjectId } from "mongoose";

export interface IRefreshToken extends Document {
  userId: ObjectId;
  token: string;
  expiresAt: Number;
}

const refreshTokenSchema: Schema = new Schema<IRefreshToken>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    expiresAt: { type: Number, required: true },
  },
  { timestamps: true }
);

export const RefreshToken = model<IRefreshToken>(
  "RefreshToken",
  refreshTokenSchema
);
