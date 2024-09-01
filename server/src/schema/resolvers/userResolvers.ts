// src/schema/resolvers/userResolvers.ts

import { User, IUser } from "../../models/User";

const userResolvers = {
  Query: {
    getUser: async (_: any, { id }: { id: string }): Promise<IUser | null> => {
      return await User.findById(id);
    },
    getUsers: async (): Promise<IUser[]> => {
      return await User.find();
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      { name, email }: { name: string; email: string }
    ): Promise<IUser> => {
      const newUser = new User({ name, email });
      return await newUser.save();
    },
    updateUser: async (
      _: any,
      { id, name, email }: { id: string; name?: string; email?: string }
    ): Promise<IUser | null> => {
      return await User.findByIdAndUpdate(id, { name, email }, { new: true });
    },
    deleteUser: async (_: any, { id }: { id: string }): Promise<string> => {
      await User.findByIdAndDelete(id);
      return "User deleted successfully";
    },
  },
};

export default userResolvers;
