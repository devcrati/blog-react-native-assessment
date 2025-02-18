import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Article from "./Article";
import { articles } from "./data";
import { getNews } from "./apis";

export default function NewsList({ navigation }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);

  const getData = async () => {
    setLoading(true);
    try {
      const data = await getNews();
      setArticles(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Failed to load articles.");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setFilteredArticles(
      articles.filter(
        (article) =>
          article.title.includes(query) || article.description.includes(query)
      )
    );
  }, [query]);

  const handleNavigation = () => {
    navigation.navigate("Saved");
  };

  // Implement the solution here
  return (
    <SafeAreaView style={styles.container}>
      {/* Implement the solution here */}
      <Text style={styles.headlines} testID="app_title">
        News Today
      </Text>
      <TextInput value={query} onChangeText={setQuery} testID="search_input" />
      <Button
        testID="navigate_saved_articles_button"
        title="SavedArticles"
        onPress={handleNavigation}
      />
      {isLoading ? (
        <ActivityIndicator testID="loading_indicator" />
      ) : (
        <FlatList
          data={filteredArticles}
          testID="articles_list"
          renderItem={({ item }) => <Article key={item.id} item={item} />}
          ItemSeparatorComponent={<View style={styles.separator} />}
        />
      )}
    </SafeAreaView>
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
    marginTop: 20,
    paddingHorizontal: 16,
    color: "#3498db",
  },
  separator: {
    height: 10,
  },
});
