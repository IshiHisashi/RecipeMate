// src/schema/resolvers/index.ts

import userResolvers from "./userResolvers";
// import other resolvers here

const resolvers = {
  Query: {
    ...userResolvers.Query,
    // ...other resolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    // ...other resolvers.Mutation
  },
};

export default resolvers;
