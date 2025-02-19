import React, { memo } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Article = memo(function Article({ item }) {
  const handleSave = async () => {
    const saved = await AsyncStorage.getItem("savedArticles");
    if (saved) {
      const savedArticles = JSON.parse(saved);
      await AsyncStorage.setItem(
        "savedArticles",
        JSON.stringify([...savedArticles, item])
      );
    } else {
      await AsyncStorage.setItem("savedArticles", JSON.stringify([item]));
    }
  };

  // Implement the solution here
  return (
    <View style={styles.article} testID={`article_item_${item.id}`}>
      {/* Implement the solution here */}
      <Image
        source={{ uri: item.image }}
        style={{ width: "100%", height: 100 }}
        testID={`article_image_${item.id}`}
      />
      <Text style={styles.articleTitle} testID={`article_title_${item.id}`}>
        {item.title}
      </Text>
      <Text
        style={styles.articleDescription}
        testID={`article_description_${item.id}`}
      >
        {item.description}
      </Text>
      <Button
        testID={`save_button_${item.id}`}
        onPress={handleSave}
        title="Save for Later"
      />
    </View>
  );
});

export default Article;

const styles = StyleSheet.create({
  article: {
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  articleTitle: {
    fontSize: 20,
    color: "#2c3e50",
    marginBottom: 5,
  },
  articleDescription: {
    fontSize: 16,
  },
});
