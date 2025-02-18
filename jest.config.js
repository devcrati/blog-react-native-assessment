module.exports = {
  preset: "react-native",
  setupFiles: ["./jest.setup.js"],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|expo-image|expo-modules-core)",
  ],

  moduleNameMapper: {
    "@react-native-async-storage/async-storage":
      "./__mocks__/@react-native-async-storage/async-storage.js",
    "react-native-gesture-handler":
      "./__mocks__/react-native-gesture-handler.js",
    "expo-image": "./__mocks__/expo-image.js",
  },
  coverageDirectory: "coverage",
  testEnvironment: "node", // Usually Jest can infer this, but specifying it can sometimes help
  collectCoverage: false,
};
