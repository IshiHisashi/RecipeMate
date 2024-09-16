import React, { useState } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import Title from "../components/Title";
import Ingredient from "../components/findRecipe/Ingredient";
import axios from "axios";
import { GRAPHURL } from "@env";

interface Ingredient {
  ingredientName: string;
  quantity: number | string;
  unit: string;
}

interface Recipe {
  recipeName: string;
  ingredients: Ingredient[];
  genreOfMeal: string;
  typeOfMeal: string;
  instructions: string;
  suggestions: string;
}

type RootStackParamList = {
  RecommendScreen: {
    recipes: string;
  };
};
type RecommendScreenRouteProp = RouteProp<
  RootStackParamList,
  "RecommendScreen"
>;

function RecommendScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const route = useRoute<RecommendScreenRouteProp>();
  const { recipes } = route.params;
  const cleanedRecipes = recipes.replace(/```json|```/g, "");
  let parsedRecipes: Recipe[] = JSON.parse(cleanedRecipes);

  // modal
  const openModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
    setModalVisible(false);
  };

  // DB registration
  const handleTakeIt = async (recipe: Recipe) => {
    // console.log(recipe.recipeName);
    // console.log(GRAPHURL);
    const addRecipeMutation = `mutation createRecipe($recipeName: String!, $genreOfMeal: String, $typeOfMeal: MealType, $instructions: String, $suggestions: String,$dateTaken: Date){
        createRecipe(recipeName: $recipeName,genreOfMeal: $genreOfMeal,typeOfMeal: $typeOfMeal,instructions: $instructions,suggestions: $suggestions,dateTaken: $dateTaken) {
          recipeName,genreOfMeal,typeOfMeal,instructions,suggestions,dateTaken
        }
      }`;
    try {
      const response = await axios({
        url: `${GRAPHURL}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          query: addRecipeMutation,
          variables: {
            recipeName: recipe.recipeName,
            genreOfMeal: recipe.genreOfMeal,
            typeOfMeal: recipe.typeOfMeal.toLocaleLowerCase(),
            instructions: recipe.instructions,
            suggestions: recipe.suggestions,
            dateTaken: new Date(),
          },
        },
      });

      console.log("Recipe added:", response.data);
      closeModal();
    } catch (err: any) {
      console.log("Error:", err.response?.data || err.message);
    }
  };

  return (
    <View className="flex-col gap-6 m-4 ">
      <Title text="Hi, your recipe would be..." />
      {parsedRecipes.map((parsedRecipe, index) => (
        <View
          key={index}
          className="flex-col gap-1 bg-slate-300 px-4 py-5 rounded-[10px]"
        >
          <Text className="font-bold text-[18px]">
            {parsedRecipe.recipeName}
          </Text>
          <View className="flex-row justify-between">
            <View className="flex-row gap-2">
              <Text>{parsedRecipe.genreOfMeal}</Text>
              <Text>{parsedRecipe.typeOfMeal}</Text>
            </View>
            <Pressable
              className="rounded-[12px] bg-blue-500"
              onPress={() => openModal(parsedRecipe)}
            >
              <Text className=" text-white p-2 text-center">See detail</Text>
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
              <View className="flex flex-row gap-3 flex-wrap">
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <View className="w-[45%]" key={index}>
                    <Text>{ingredient.ingredientName}</Text>
                    <Text>
                      {ingredient.quantity} {ingredient.unit}
                    </Text>
                  </View>
                ))}
              </View>
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
                  className="mt-6 rounded-[12px] bg-blue-500 p-4 w-[50%] "
                  onPress={() => handleTakeIt(selectedRecipe)}
                >
                  <Text className="text-white text-center font-bold">
                    Take it
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

export default RecommendScreen;
