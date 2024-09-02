import { User, IUser } from "../../models/User";

const userResolvers = {
  Query: {
    getUser: async (_: any, { id }: { id: string }): Promise<IUser | null> => {
      return await User.findById(id).populate("recipeHistory");
    },
    getUsers: async (): Promise<IUser[]> => {
      return await User.find().populate("recipeHistory");
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      {
        firstName,
        lastName,
        email,
        familyType,
        numFamily,
        recipeHistory,
      }: {
        firstName: string;
        lastName: string;
        email: string;
        familyType?: string;
        numFamily?: number;
        recipeHistory?: string[];
      }
    ): Promise<IUser> => {
      const newUser = new User({
        firstName,
        lastName,
        email,
        familyType,
        numFamily,
        recipeHistory,
      });
      return await newUser.save();
    },
    updateUser: async (
      _: any,
      {
        id,
        firstName,
        lastName,
        email,
        familyType,
        numFamily,
        recipeHistory,
      }: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        familyType?: string;
        numFamily?: number;
        recipeHistory?: string[];
      }
    ): Promise<IUser | null> => {
      return await User.findByIdAndUpdate(
        id,
        { firstName, lastName, email, familyType, numFamily, recipeHistory },
        { new: true }
      );
    },
    deleteUser: async (_: any, { id }: { id: string }): Promise<string> => {
      await User.findByIdAndDelete(id);
      return "User deleted successfully";
    },
  },
};

export default userResolvers;
