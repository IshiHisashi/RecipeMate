import { Button, Pressable } from "react-native";

type BtnProps = {
  fnc: () => void;
};

function Btn({ fnc }: BtnProps) {
  return (
    <Pressable
      className=" bg-[#009963] p-2 flex justify-center rounded-[16px]"
      //   onPress={fnc}
    >
      <Button title="Find Racipe" color="#fff" onPress={fnc}></Button>
    </Pressable>
  );
}

export default Btn;
