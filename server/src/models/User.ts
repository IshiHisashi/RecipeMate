// src/models/User.ts

import { Schema, model, Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  familyType?: "single" | "withPartner" | "withKids";
  numFamily?: number;
  recipeHistory?: ObjectId[];
}

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  familyType: {
    type: String,
    enum: ["single", "withPartner", "withKids"],
  },
  numFamily: {
    type: Number,
  },
  recipeHistory: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
});

export const User = model<IUser>("User", userSchema);
