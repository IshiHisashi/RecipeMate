import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import FindRecipeScreen from "./screens/FindRecipeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import "./global.css";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "#1C170D",
          tabBarInactiveTintColor: "#A1824A",
          tabBarIcon: ({ focused, color }) => {
            let iconName: any = "";
            let size: any = "";

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
              size = focused ? 24 : 18;
            } else if (route.name === "FindRecipe") {
              iconName = focused ? "search" : "search-outline";
              size = focused ? 24 : 18;
            } else if (route.name === "ProfileScreen") {
              iconName = focused ? "person" : "person-outline";
              size = focused ? 24 : 18;
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: "Home",
            tabBarLabel: "Home",
          }}
        />
        <Tab.Screen
          name="FindRecipe"
          component={FindRecipeScreen}
          options={{
            headerTitle: "Find Recipe",
            tabBarLabel: "Find Recipe",
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerTitle: "Your Profile",
            tabBarLabel: "Your Profile",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "hotpink",
    alignItems: "center",
    justifyContent: "center",
  },
});
