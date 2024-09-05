import { View, Text, TextInput } from "react-native";
import Title from "../Title";
import TimingOfMeal from "./TimingOfMeal";
import GenreOfMeal from "./GenreOfMeal";

type ChildComponentProps = {
  setTypeOfMealReq: React.Dispatch<React.SetStateAction<string>>;
  setTimingOfMealReq: React.Dispatch<React.SetStateAction<string>>;
  setOptionalComment: React.Dispatch<React.SetStateAction<string>>;
};

function TypeOfMeal({
  setTypeOfMealReq,
  setTimingOfMealReq,
  setOptionalComment,
}: ChildComponentProps) {
  const handleOptionalComment = (text: string) => {
    setOptionalComment(text);
  };

  return (
    <View className="flex gap-3">
      <Title text="Type Of Meal" />
      <TimingOfMeal setTimingOfMealReq={setTimingOfMealReq} />
      <GenreOfMeal setTypeOfMealReq={setTypeOfMealReq} />
      <TextInput
        className="rounded-[8px] border border-slate-300 bg-slate-200 h-[80px] py-3 px-2"
        editable
        multiline
        placeholder="Type whatever you want!!"
        scrollEnabled
        onChangeText={handleOptionalComment}
      />
    </View>
  );
}

export default TypeOfMeal;
