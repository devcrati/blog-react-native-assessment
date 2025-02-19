import { useKeepAwake } from "expo-keep-awake";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import NewsList from "./NewsList";
import { createStackNavigator } from "@react-navigation/stack";
import SavedArticlesScreen from "./SavedArticles";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator({
  screens: {
    Home: HomeScreen,
    SavedArticles: SavedArticlesScreen,
  },
});

export default function App() {
  useKeepAwake();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Saved" component={SavedArticlesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View steyle={styles.container} testID="app_container">
      <NewsList navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
  },
});
