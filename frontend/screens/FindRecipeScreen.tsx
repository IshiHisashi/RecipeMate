import { useState, useEffect } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ingredient from "../components/findRecipe/Ingredient";
import TypeOfMeal from "../components/findRecipe/TypeOfMeal";
import TimeRange from "../components/findRecipe/TimeRange";
import Btn from "../components/Btn";
import OpenAI from "openai";
import { EXPO_PUBLIC_OPENAI_API_KEY } from "@env";

const openai = new OpenAI({
  apiKey: EXPO_PUBLIC_OPENAI_API_KEY,
});

// COMPNENT
function FindRecipeScreen() {
  const navigation = useNavigation();
  const [ingredientReq, setIngredientReq] = useState<string>("");
  const [typeOfMealReq, setTypeOfMealReq] = useState<string>("");
  const [timingOfMealReq, setTimingOfMealReq] = useState<string>("");
  const [optionalComment, setOptionalComment] = useState<string>("");
  const [timeRangeReq, setTimeRangeReq] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  // -----------------------------
  // Prompt model
  // Request
  const numOfRecipe: number = 2;
  const promptReq: string = `Using the following ingredient such as ${ingredientReq}, with the style of ${typeOfMealReq}. I wanna eat it as a ${timingOfMealReq}. If any, please also consider ${optionalComment}`;
  const promptReturn: string = `Please provide ${numOfRecipe} recipes in the following format. Please be sure that you should return only JSON part. ["Recipe 1" : recipeName: "string : title of recipe",
  ingredients: array of object : please align with the format in {
    ingredientName: name of ingredient,
  quentity: required amount / piece etc...,
  unit: unit with above quantity,
  } so that we can parse lated,
  genreOfMeal: typeOfMealReq,
  typeOfMeal: timingOfMealReq,
  instructions: 'string : format is "step1:xxx, step2:xxx"',
  suggestions: "string: please suggest for better taste"... and repeat up to the number of Recipe given] `;
  const caution: string = `when you return the quantity, do not use fraction like 1/4. Use 0.25 instead. This is to ensure that is parsed in type of number.`;
  // -----------------------------

  async function getGPTResponse() {
    if (ingredientReq!.length > 0 && typeOfMealReq!.length > 0) {
      const prompt = promptReq + promptReturn + caution;
      try {
        setLoading(true);
        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 1,
          max_tokens: 1000,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });

        // Log the GPT-4 response
        console.log("request is : " + prompt);
        const result = response.choices[0].message.content;
        console.log(result);
        setLoading(false);
        // navigation
        navigation.navigate("RecommendScreen", { recipes: result });
      } catch (error) {
        console.error("Error fetching GPT response:", error);
      }
    } else {
      console.log("Please provide all the necessary info.");
    }
  }

  const handleSubmit = () => {
    if (!loading) {
      getGPTResponse();
    }
  };

  // Execute the function
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        {/* Main Content */}
        <View className="flex-col gap-10 m-4 ">
          <Ingredient setIngredientReq={setIngredientReq} />
          <TypeOfMeal
            setTypeOfMealReq={setTypeOfMealReq}
            setTimingOfMealReq={setTimingOfMealReq}
            setOptionalComment={setOptionalComment}
          />
          <TimeRange />
          <TouchableOpacity disabled={loading} onPress={handleSubmit}>
            <Btn fnc={handleSubmit} />
          </TouchableOpacity>
        </View>

        {/* Overlay for Loading */}
        {loading && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={{ color: "white", marginTop: 10 }}>
              We're preparing your recipe...
            </Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default FindRecipeScreen;

// const ingredientModel = {
//   ingredientName: "name of ingredient",
//   quentity: "required amount / piece etc...",
//   unit: "unit with above quantity",
// };
// const recipeModel = {
//   recipeName: "string : title of recipe",
//   ingredients: `array of object : please align with the format in {
//     ingredientName: name of ingredient,
//   quentity: required amount / piece etc...,
//   unit: unit with above quantity,
//   } so that we can parse lated`,
//   genreOfMeal: typeOfMealReq,
//   typeOfMealReq: timingOfMealReq,
//   instructions: 'string : format is "step1:xxx, step2:xxx"',
//   suggestions: "string: please suggest for better taste",
// };
