import { View, Text, TextInput } from "react-native";
import Title from "../Title";

type ChildComponentProps = {
  setIngredientReq: React.Dispatch<React.SetStateAction<string>>;
};

function Ingredient({ setIngredientReq }: ChildComponentProps) {
  const handleInput = (text: string) => {
    setIngredientReq(text);
  };
  return (
    <View className="flex-col gap-3">
      <Title text="Let me know your ingrediens" />
      <TextInput
        className="rounded-[8px] border border-slate-300 bg-slate-200 h-[80px] py-3 px-2"
        editable
        multiline
        placeholder="enter ingredient"
        scrollEnabled
        onChangeText={handleInput}
      />
    </View>
  );
}

export default Ingredient;
