// files/tests/level3/App.test.js

import React from "react";
import {
  render,
  waitFor,
  fireEvent,
  within,
} from "@testing-library/react-native";
import NewsList from "../../NewsList";
import App from "../../App";
import * as apis from "../../apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
jest.mock("../../apis");

jest.mock("expo-keep-awake", () => ({
  useKeepAwake: jest.fn().mockReturnValue(true), // Mock to keep the screen awake
}));

describe("App Component, Level 3", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Test 1: Image Handling with `expo-image`", async () => {
    const testArticles = [
      {
        id: "1",
        title: "Level 3 Test Article 1",
        description: "Level 3 Test Description 1",
        image: "https://test.com/image1.jpg",
      },
      {
        id: "2",
        title: "Level 3 Test Article 2",
        description: "Level 3 Test Description 2",
        image: "https://test.com/image2.jpg",
      },
    ];
    apis.getNews.mockResolvedValueOnce(testArticles);

    const { getByTestId } = render(
      <NewsList navigation={{ navigate: jest.fn() }} />
    );

    await waitFor(() => expect(apis.getNews).toHaveBeenCalled());

    const articlesList = getByTestId("articles_list");

    for (const article of testArticles) {
      const articleItem = getByTestId(`article_item_${article.id}`);
      expect(articleItem).toBeTruthy();

      // Use within articleItem to search for the mock Image component with the correct URI
      const imageComponent = within(articleItem).getByTestId(
        `article_image_${article.id}`
      );
      expect(imageComponent).toBeTruthy();
      expect(imageComponent.props.source.uri).toBe(article.image);
    }
  });

  it("Test 2: Search Functionality", async () => {
    const testArticles = [
      {
        id: "1",
        title: "Technology Advances",
        description: "New tech in 2021",
        image: "https://test.com/image1.jpg",
      },
      {
        id: "2",
        title: "Sports Update",
        description: "Latest sports news",
        image: "https://test.com/image2.jpg",
      },
      {
        id: "3",
        title: "Health Tips",
        description: "How to stay healthy",
        image: "https://test.com/image3.jpg",
      },
    ];
    apis.getNews.mockResolvedValueOnce(testArticles);

    const { getByTestId, queryByTestId, queryAllByTestId } = render(
      <NewsList navigation={{ navigate: jest.fn() }} />
    );

    await waitFor(() => expect(apis.getNews).toHaveBeenCalled());

    const searchInput = getByTestId("search_input");

    fireEvent.changeText(searchInput, "Technology");

    const displayedArticles = queryAllByTestId(/article_item_/);

    expect(displayedArticles).toHaveLength(1);
    expect(getByTestId("article_item_1")).toBeTruthy();

    expect(queryByTestId("article_item_2")).toBeNull();
    expect(queryByTestId("article_item_3")).toBeNull();

    // Clear search input
    fireEvent.changeText(searchInput, "");

    const allDisplayedArticles = queryAllByTestId(/article_item_/);
    expect(allDisplayedArticles).toHaveLength(3);

    expect(getByTestId("article_item_1")).toBeTruthy();
    expect(getByTestId("article_item_2")).toBeTruthy();
    expect(getByTestId("article_item_3")).toBeTruthy();
  });

  it("Test 3: Navigation Between Screens", async () => {
    const testArticles = [
      {
        id: "1",
        title: "First Article",
        description: "Description 1",
        image: "https://test.com/image1.jpg",
      },
    ];
    apis.getNews.mockResolvedValueOnce(testArticles);

    const { getByTestId, findByTestId } = render(<App />);

    await waitFor(() => expect(apis.getNews).toHaveBeenCalled());

    const navigateButton = getByTestId("navigate_saved_articles_button");
    fireEvent.press(navigateButton);

    const appContainer = await findByTestId("app_container");
    expect(appContainer).toBeTruthy();

    const appTitle = getByTestId("app_title");
    expect(appTitle.props.children).toBe("Saved Articles");

    const backButton = getByTestId("back_button");
    fireEvent.press(backButton);

    const appTitleNewsList = getByTestId("app_title");
    expect(appTitleNewsList.props.children).toBe("News Today");
  });

  it("Test 4: Save for Later Functionality", async () => {
    const testArticles = [
      {
        id: "1",
        title: "First Article",
        description: "Description 1",
        image: "https://test.com/image1.jpg",
      },
    ];
    apis.getNews.mockResolvedValueOnce(testArticles);
    AsyncStorage.getItem.mockResolvedValueOnce(null); // No saved articles initially
    const { getByTestId, findByTestId } = render(<App />);

    // Wait for articles to load
    await waitFor(() => expect(apis.getNews).toHaveBeenCalled());

    // Press save button on article_item_1
    const saveButton = getByTestId("save_button_1");
    fireEvent.press(saveButton);

    // Ensure setItem is called with correct data
    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "savedArticles",
        JSON.stringify([testArticles[0]])
      );
    });

    // Mock getItem to return the saved articles before navigating
    AsyncStorage.getItem.mockResolvedValueOnce(
      JSON.stringify([testArticles[0]])
    );

    // Navigate to savedArticles
    const navigateButton = getByTestId("navigate_saved_articles_button");
    fireEvent.press(navigateButton);

    // Wait for SavedArticles screen to load
    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith("savedArticles");
    });

    const savedArticleItem = getByTestId("article_item_1");
    expect(savedArticleItem).toBeTruthy();

    const articleTitle = getByTestId("article_title_1");
    expect(articleTitle.props.children).toBe("First Article");

    const articleDescription = getByTestId("article_description_1");
    expect(articleDescription.props.children).toBe("Description 1");
  });
});
