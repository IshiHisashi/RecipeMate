import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import axios from "axios";
import Title from "components/Title";

interface Ingredient {
  id: string;
  ingredientName: string;
  quantity: number | string;
  unit: string;
}

interface Recipe {
  id: string;
  recipeName: string;
  ingredients: Ingredient[];
  genreOfMeal: string;
  typeOfMeal: string;
  instructions: string;
  suggestions: string;
  dateTaken: string;
}

function HomeScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const fetchRecipes = async () => {
    const getRecipesQuery = `
      query getRecipes {
        getRecipes {
          id
          recipeName
          genreOfMeal
          typeOfMeal
          instructions
          suggestions
          dateTaken
        }
      }
    `;

    try {
      const response = await axios({
        url: "http://192.168.1.64:5500/graphql", // Replace with your server's IP address
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          query: getRecipesQuery,
        },
      });
      console.log(response.data.data.getRecipes);
      setRecipes(response.data.data.getRecipes);
      // const parcedRecipes = JSON.parse(response.data);
      // console.log(parcedRecipes);
      // setRecipes(parcedRecipes);
    } catch (err: any) {
      console.error(
        "Error fetching recipes:",
        err.response?.data || "b" + err.message
      );
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <View className="p-4 flex-col gap-6">
      <Title text="Welcome home!!" />
      {recipes.map((recipe) => (
        <View
          key={recipe.id}
          className="bg-slate-200 p-4 rounded-[10px] flex-col gap-2"
        >
          <View className="flex-row justify-between">
            <Text className="text-[18px] font-bold">{recipe.recipeName}</Text>
            <View className="py-1 px-3 rounded-[100px] bg-green-600">
              <Text className="text-white ">{recipe.genreOfMeal}</Text>
            </View>
          </View>
          <Text>{`Taken as ${recipe.typeOfMeal} on ${
            recipe.dateTaken.split("T")[0]
          }`}</Text>
        </View>
      ))}
    </View>
  );
}

export default HomeScreen;
