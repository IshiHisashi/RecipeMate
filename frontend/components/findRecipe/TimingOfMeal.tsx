import { useState } from "react";
import { View, Text, Pressable } from "react-native";

type ChildComponentProps = {
  setTimingOfMealReq: React.Dispatch<React.SetStateAction<string>>;
};

function TimingOfMeal({ setTimingOfMealReq }: ChildComponentProps) {
  const [selectedTiming, setSelectedTiming] = useState<string | null>(null);
  const timings: string[] = ["breakfast", "lunch", "dinner"];

  const handlePress = (timing: string) => {
    setSelectedTiming(timing); // Update local state
    setTimingOfMealReq(timing); // Update parent state
  };

  return (
    <View className="flex-row gap-2">
      {timings.map((timing) => (
        <Pressable
          key={timing}
          onPress={() => handlePress(timing)}
          className={`py-1 px-3 rounded-[100px] ${
            selectedTiming === timing ? "bg-blue-500" : "bg-blue-100"
          }`}
        >
          <Text
            className={`${
              selectedTiming === timing ? "text-white font-bold" : ""
            }`}
          >
            {timing}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

export default TimingOfMeal;
