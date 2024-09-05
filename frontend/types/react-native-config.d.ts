declare module "react-native-config" {
  interface EnvConfig {
    API_URL: string;
    EXPO_PUBLIC_OPENAI_API_KEY: string;
    TEST_VARIABLE: string;
    // Add more variables as needed
  }

  const Config: EnvConfig;

  export default Config;
}
