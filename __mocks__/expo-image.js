// __mocks__/expo-image.js
import React from "react";
import { View } from "react-native";

export const Image = (props) => (
  <View {...props} testID={props.testID || "expo-image"} />
);
export default Image;
