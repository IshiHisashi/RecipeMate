import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    familyType: FamilyType
    numFamily: Int
    recipeHistory: [Recipe]
  }
  type Recipe {
    id: ID!
    recipeName: String!
    genreOfMeal: String
    typeOfMeal: MealType
    instructions: String
    suggestions: String
    dateTaken: Date
    ingredients: [Ingredient]
  }

  type Ingredient {
    id: ID!
    ingredientName: String!
    quantity: Float!
    unit: String!
    typeOfIngredient: String
  }

  enum FamilyType {
    single
    withPartner
    withKids
  }

  enum MealType {
    breakfast
    lunch
    dinner
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User!]!
    getRecipe(id: ID!): Recipe
    getRecipes: [Recipe!]!
    getIngredient(id: ID!): Ingredient
    getIngredients: [Ingredient!]!
  }

  type Mutation {
    # User
    createUser(
      firstName: String!
      lastName: String!
      email: String!
      familyType: FamilyType
      numFamily: Int
      recipeHirtory: [ID]
    ): User!
    updateUser(
      id: ID!
      firstName: String!
      lastName: String!
      email: String!
      familyType: FamilyType
      numFamily: Int
      recipeHirtory: [ID]
    ): User!
    deleteUser(id: ID!): String!

    # Recipe
    createRecipe(
      recipeName: String!
      genreOfMeal: String
      typeOfMeal: MealType
      instructions: String
      suggestions: String
      dateTaken: Date
      ingredients: [ID]
    ): Recipe!
    updateRecipe(
      id: ID!
      recipeName: String!
      genreOfMeal: String
      typeOfMeal: MealType
      instructions: String
      suggestions: String
      dateTaken: Date
      ingredients: [ID]
    ): Recipe!
    deleteRecipe(id: ID!): String!

    # Ingredient
    createIngredient(
      ingredientName: String!
      quantity: Float!
      unit: String!
      typeOfIngredient: String
    ): Ingredient!
    updateIngredient(
      id: ID!
      ingredientName: String!
      quantity: Float!
      unit: String!
      typeOfIngredient: String
    ): Ingredient!
    deleteIngredient(id: ID!): String!
  }
`;
