import { Text } from "react-native";

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return <Text className="text-[20px] font-bold">{text}</Text>;
};

export default Title;
