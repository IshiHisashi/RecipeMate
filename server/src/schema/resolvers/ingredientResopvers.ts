import { Ingredient, IIngredient } from "../../models/Ingredient";

const ingredientResolvers = {
  Query: {
    getIngredient: async (
      _: any,
      { id }: { id: string }
    ): Promise<IIngredient | null> => {
      return await Ingredient.findById(id);
    },
    getIngredients: async (): Promise<IIngredient[]> => {
      return await Ingredient.find();
    },
  },
  Mutation: {
    createIngredient: async (
      _: any,
      {
        ingredientName,
        quantity,
        unit,
        typeOfIngredient,
      }: {
        ingredientName: string;
        quantity: number;
        unit: string;
        typeOfIngredient?: string;
      }
    ): Promise<IIngredient> => {
      const newIngredient = new Ingredient({
        ingredientName,
        quantity,
        unit,
        typeOfIngredient,
      });
      return await newIngredient.save();
    },
    updateIngredient: async (
      _: any,
      {
        id,
        ingredientName,
        quantity,
        unit,
        typeOfIngredient,
      }: {
        id: string;
        ingredientName: string;
        quantity: number;
        unit: string;
        typeOfIngredient?: string;
      }
    ): Promise<IIngredient | null> => {
      return await Ingredient.findByIdAndUpdate(
        id,
        { ingredientName, quantity, unit, typeOfIngredient },
        { new: true }
      );
    },
    deleteIngredient: async (
      _: any,
      { id }: { id: string }
    ): Promise<string> => {
      await Ingredient.findByIdAndDelete(id);
      return "Ingredient deleted successfully";
    },
  },
};

export default ingredientResolvers;
