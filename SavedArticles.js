import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import Article from "./Article";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SavedArticles({ navigation }) {
  const items = [];
  const [savedArticles, setSavedArticles] = useState([]);

  const getArticles = async () => {
    AsyncStorage.getItem("savedArticles")
      .then((value) => setSavedArticles(JSON.parse(value)))
      .catch((err) => setSavedArticles([]));
  };

  useEffect(() => {
    getArticles();
  }, []);
  // Implement the solution here
  return (
    <View testID="app_container">
      <Button title="Back" testID="back_button" onPress={navigation.goBack} />
      <Text style={steyls.headlines} testID="app_title">
        Saved Articles
      </Text>
      <FlatList
        data={items}
        testID="articles_list"
        renderItem={({ item }) => <Article key={item.id} item={item} />}
        ItemSeparatorComponent={<View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    paddingTop: 30,
  },
  headlines: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 16,
    color: "#3498db",
  },
});
