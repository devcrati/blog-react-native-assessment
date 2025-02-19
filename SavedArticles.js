import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import Article from "./Article";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SavedArticles({ navigation }) {
  const [savedArticles, setSavedArticles] = useState([]);

  const getArticles = async () => {
    const jsonValue = await AsyncStorage.getItem("savedArticles");
    if (jsonValue != null) {
      setSavedArticles(JSON.parse(jsonValue));
    }
  };

  useEffect(() => {
    getArticles();
  }, []);
  // Implement the solution here
  return (
    <View style={styles.container} testID="app_container">
      <View style={styles.header}>
        <Button title="Back" testID="back_button" onPress={navigation.goBack} />
        <Text style={styles.headlines} testID="app_title">
          Saved Articles
        </Text>
      </View>
      <FlatList
        data={savedArticles}
        testID="articles_list"
        renderItem={({ item }) => <Article key={item.id} item={item} />}
        ItemSeparatorComponent={<View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
  },
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
  separator: {
    height: 10,
  },
});
