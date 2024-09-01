// src/index.ts

import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema/typeDefs";
import resolvers from "./schema/resolvers/resolvers";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { any } from "webidl-conversions";

dotenv.config({ path: "../config.env" });

const startServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 5500;

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Connect to Database
  mongoose
    .connect(`${process.env.MONGOURL}`)
    .then(() => {
      console.log("connected with DB successfully!");
    })
    .catch((error) => {
      console.log(error);
    });

  // Initialize Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
  });

  await server.start();
  server.applyMiddleware({ app: app as any, path: "/graphql" });

  // Start Express Server
  app.listen(PORT, () => {
    console.log(
      `Server is running on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

startServer().catch((error) => {
  console.error("Server failed to start", error);
});
