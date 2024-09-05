const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();
const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
