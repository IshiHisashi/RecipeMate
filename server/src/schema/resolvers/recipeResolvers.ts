import { Recipe, IRecipe } from "../../models/Recipe";

const recipeResolvers = {
  Query: {
    getRecipe: async (
      _: any,
      { id }: { id: string }
    ): Promise<IRecipe | null> => {
      return await Recipe.findById(id).populate("ingredients");
    },
    getRecipes: async (): Promise<IRecipe[]> => {
      return await Recipe.find().populate("ingredients");
    },
  },
  Mutation: {
    createRecipe: async (
      _: any,
      {
        recipeName,
        genreOfMeal,
        typeOfMeal,
        instructions,
        suggestions,
        dateTaken,
        ingredients,
      }: {
        recipeName: string;
        genreOfMeal?: string;
        typeOfMeal?: string;
        instructions?: string;
        suggestions?: string;
        dateTaken?: Date;
        ingredients?: string[];
      }
    ): Promise<IRecipe> => {
      const newRecipe = new Recipe({
        recipeName,
        genreOfMeal,
        typeOfMeal,
        instructions,
        suggestions,
        dateTaken,
        ingredients,
      });
      return await newRecipe.save();
    },
    updateRecipe: async (
      _: any,
      {
        id,
        recipeName,
        genreOfMeal,
        typeOfMeal,
        instructions,
        suggestions,
        dateTaken,
        ingredients,
      }: {
        id: string;
        recipeName: string;
        genreOfMeal?: string;
        typeOfMeal?: string;
        instructions?: string;
        suggestions?: string;
        dateTaken?: Date;
        ingredients?: string[];
      }
    ): Promise<IRecipe | null> => {
      return await Recipe.findByIdAndUpdate(
        id,
        {
          recipeName,
          genreOfMeal,
          typeOfMeal,
          instructions,
          suggestions,
          dateTaken,
          ingredients,
        },
        { new: true }
      );
    },
    deleteRecipe: async (
      _: any,
      {
        id,
      }: {
        id: string;
      }
    ): Promise<string> => {
      await Recipe.findByIdAndDelete(id);
      return "Recipe deleted successfully";
    },
  },
};

export default recipeResolvers;
