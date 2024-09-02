import { Schema, model, Document, ObjectId } from "mongoose";

export interface IIngredient extends Document {
  ingredientName: string;
  quantity: number;
  unit: string;
  typeOfIngredient: string;
}

const ingredientSchema = new Schema<IIngredient>({
  ingredientName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  typeOfIngredient: {
    type: String,
  },
});

export const Ingredient = model<IIngredient>("Ingredient", ingredientSchema);
