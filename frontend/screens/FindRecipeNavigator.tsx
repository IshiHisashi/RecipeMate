import { createStackNavigator } from "@react-navigation/stack";
import FindRecipeScreen from "./FindRecipeScreen";
import RecommendScreen from "./RecommendScreen";

const Stack = createStackNavigator();

function FindRecipeNavigation() {
  return (
    <Stack.Navigator>
      {/* The main screen inside the FindRecipe tab */}
      <Stack.Screen
        name="FindRecipe"
        component={FindRecipeScreen}
        options={{ headerTitle: "Find Recipe" }}
      />
      {/* The sibling screen which will not appear in the tab navigation */}
      <Stack.Screen
        name="RecommendScreen"
        component={RecommendScreen}
        options={{ headerTitle: "Recommendations" }}
      />
    </Stack.Navigator>
  );
}

export default FindRecipeNavigation;
