import { useState } from "react";
import { View, Text, Pressable } from "react-native";

type ChildComponentProps = {
  setTypeOfMealReq: React.Dispatch<React.SetStateAction<string>>;
};

function GenreOfMeal({ setTypeOfMealReq }: ChildComponentProps) {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const genres: string[] = [
    "French",
    "Italian",
    "Chinese",
    "Korean",
    "Thai",
    "Indonesian",
    "Japanese",
  ];

  const handlePress = (genre: string) => {
    setSelectedGenre(genre); //Update local state
    setTypeOfMealReq(genre); //Update parent state
  };

  return (
    <View className="flex-row gap-2 flex-wrap">
      {genres.map((genre) => (
        <Pressable
          key={genre}
          onPress={() => handlePress(genre)}
          className={`py-1 px-3 rounded-[100px] ${
            selectedGenre === genre ? "bg-green-600" : "bg-green-100"
          }`}
        >
          <Text
            className={`${
              selectedGenre === genre ? "text-white font-bold" : ""
            }`}
          >
            {genre}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
export default GenreOfMeal;
