import { View, Text, TextInput } from "react-native";

function TextInput() {
  return (
    <View>
      <TextInput
        className="rounded-[8px] border border-slate-300 bg-slate-200 h-[80px] py-3 px-2"
        editable
        multiline
        placeholder="enter ingredient"
        scrollEnabled
      />
    </View>
  );
}

export default TextInput;
