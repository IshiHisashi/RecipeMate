import { Schema, model, Document, ObjectId } from "mongoose";

export interface IRecipe extends Document {
  recipeName: string;
  ingredients?: ObjectId[];
  genreOfMeal: string;
  typeOfMeal: string;
  instructions: string;
  suggestions: string;
  dateTaken: Date;
}

const recipeSchema = new Schema<IRecipe>({
  recipeName: {
    type: String,
    require: true,
  },
  ingredients: [{ type: Schema.ObjectId, ref: "Ingredient" }],
  genreOfMeal: {
    type: String,
  },
  typeOfMeal: {
    type: String,
    enum: ["breakfast", "lunch", "dinner"],
  },
  instructions: {
    type: String,
  },
  suggestions: {
    type: String,
  },
  dateTaken: {
    type: Date,
  },
});

export const Recipe = model<IRecipe>("Recipe", recipeSchema);
