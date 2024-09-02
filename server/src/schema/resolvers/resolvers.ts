// src/schema/resolvers/index.ts

import userResolvers from "./userResolvers";
import recipeResolvers from "./recipeResolvers";
import ingredientResolvers from "./ingredientResopvers";

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...recipeResolvers.Query,
    ...ingredientResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...recipeResolvers.Mutation,
    ...ingredientResolvers.Mutation,
  },
};

export default resolvers;
