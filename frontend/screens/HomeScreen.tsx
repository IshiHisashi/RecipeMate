import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import axios from "axios";
import Title from "../components/Title";
import { GRAPHURL, GRAPHURLLOCAL } from "@env";

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

// console.log(GRAPHURL);

function HomeScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

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
        url: `${GRAPHURL}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          query: getRecipesQuery,
        },
      });
      // console.log(response.data.data.getRecipes);
      setRecipes(response.data.data.getRecipes);
      // const parcedRecipes = JSON.parse(response.data);
      // console.log(parcedRecipes);
      // setRecipes(parcedRecipes);
    } catch (err: any) {
      console.error(
        "Error fetching recipes:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // modal
  const openModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
    setModalVisible(false);
  };

  // Delete
  const handleDelete = async (id: string) => {
    const deleteRecipeMutation = `
    mutation deleteRecipe($deleteRecipeId: ID!) {
      deleteRecipe(id: $deleteRecipeId)
    }
  `;
    try {
      const response = await axios({
        url: `${GRAPHURL}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          query: deleteRecipeMutation,
          variables: {
            deleteRecipeId: id,
          },
        },
      });
      console.log("deleted", response.data);
      closeModal();
    } catch (err: any) {
      console.log(err.response.data);
    }
  };

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
          <View className="flex-row gap-4 justify-evenly">
            <Pressable
              className="p-2 w-[48%] bg-blue-500 rounded-lg"
              onPress={() => openModal(recipe)}
            >
              <Text className="text-white text-center font-bold">
                More details
              </Text>
            </Pressable>
            <Pressable className="p-2 w-[48%] bg-blue-200 rounded-lg">
              <Text className="text-slate-500 text-center font-bold">
                Modify date
              </Text>
            </Pressable>
          </View>
        </View>
      ))}
      {/* Modal--------- */}
      {selectedRecipe && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={false}
          onRequestClose={closeModal}
        >
          <View className="my-[100px] px-4">
            <View className="flex-col gap-3">
              <Title text={selectedRecipe.recipeName} />
              <Text className="font-bold text-[18px]">Ingredients</Text>
              {/* <View className="flex flex-row gap-3 flex-wrap">
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <View className="w-[45%]" key={index}>
                    <Text>{ingredient.ingredientName}</Text>
                    <Text>
                      {ingredient.quantity} {ingredient.unit}
                    </Text>
                  </View>
                ))}
              </View> */}
              <Text className="font-bold text-[18px]">How to cook</Text>
              <Text>{selectedRecipe.instructions}</Text>

              <Text className="font-bold text-[18px]">For better taste</Text>
              <Text>{selectedRecipe.suggestions}</Text>
              <View className="flex-row gap-4 justify-evenly">
                <Pressable
                  className="mt-6 rounded-[12px] bg-blue-100 p-4 w-[50%]"
                  onPress={closeModal}
                >
                  <Text className="text-blue-600 text-center font-bold">
                    Close
                  </Text>
                </Pressable>
                <Pressable
                  className=" border border-blue-400 mt-6 rounded-[12px] bg-white p-4 w-[50%]"
                  onPress={() => handleDelete(selectedRecipe.id)}
                >
                  <Text className="text-blue-400 text-center font-bold">
                    Delete
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

export default HomeScreen;
