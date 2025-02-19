import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  RefreshControl,
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
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const getData = async () => {
    setLoading(true);
    try {
      const data = await getNews(page);
      setArticles((prev) => [...prev, ...data]);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      setLoading(false);
      setRefreshing(false);
      Alert.alert("Error", "Failed to load articles.");
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    setFilteredArticles(
      articles.filter(
        (article) =>
          article.title.includes(query) || article.description.includes(query)
      )
    );
  }, [query, articles]);

  const handleNavigation = () => {
    navigation.navigate("Saved");
  };

  const onRefresh = () => {
    setRefreshing(true);
    getData();
  };

  const onEndReached = (info) => {
    console.log(info);
    setPage(page + 1);
  };

  // Implement the solution here
  return (
    <SafeAreaView style={styles.container}>
      {/* Implement the solution here */}
      <Text style={styles.headlines} testID="app_title">
        News Today
      </Text>
      <TextInput
        style={styles.textInput}
        value={query}
        onChangeText={setQuery}
        testID="search_input"
      />
      <Button
        testID="navigate_saved_articles_button"
        title="SavedArticles"
        onPress={handleNavigation}
      />
      {isLoading ? (
        <ActivityIndicator testID="loading_indicator" />
      ) : (
        <FlatList
          style={styles.list}
          data={filteredArticles}
          testID="articles_list"
          renderItem={({ item }) => <Article key={item.id} item={item} />}
          ItemSeparatorComponent={
            <View
              style={styles.separator}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
            />
          }
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={21}
          updateCellsBatchingPeriod={50}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEndReachedThreshold={0.2}
          onEndReached={onEndReached}
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
  textInput: {
    padding: 8,
    margin: 16,
    backgroundColor: "white",
  },
  list: {
    marginHorizontal: 16,
  },
});
