import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import App from "../../App";
import { Alert } from "react-native";
import { useKeepAwake } from "expo-keep-awake";

global.fetch = jest.fn();

jest.mock("expo-keep-awake", () => ({
  useKeepAwake: jest.fn().mockReturnValue(true),
}));

describe("App Component, Level 2", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("Test 1: Verify that the loading indicator is displayed while fetching articles", async () => {
    // Mock fetch to return a promise that does not resolve immediately
    fetch.mockImplementation(() => new Promise(() => {}));

    const { getByTestId, queryByTestId } = render(<App />);

    // Check that the loading indicator is displayed
    expect(getByTestId("loading_indicator")).toBeTruthy();

    // The articles_list should not be present yet
    expect(queryByTestId("articles_list")).toBeNull();

    // Verify that loading_indicator is a descendant of app_container
    const appContainer = getByTestId("app_container");
    const loadingIndicator = getByTestId("loading_indicator");
    expect(appContainer).toContainElement(loadingIndicator);
  });

  it("Test 2: Confirm taht the application title and the list of articles is rendered properly after data is fetched", async () => {
    const mockArticles = [
      {
        id: "100",
        title: "Article 1",
        description: "Description 1",
      },
      {
        id: "200",
        title: "Article 2",
        description: "Description 2",
      },
    ];
    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockArticles,
    });

    const { getByTestId } = render(<App />);

    // Wait for the app_title to appear
    await waitFor(() => expect(getByTestId("app_title")).toBeTruthy());

    // Check that the app title is displayed
    const appTitle = getByTestId("app_title");
    expect(appTitle).toBeTruthy();
    expect(appTitle.props.children).toBe("News Today");

    // Wait for the articles_list to appear
    await waitFor(() => expect(getByTestId("articles_list")).toBeTruthy());

    const articlesList = getByTestId("articles_list");
    expect(articlesList).toBeTruthy();

    // Verify that articles_list is a descendant of app_container
    const appContainer = getByTestId("app_container");
    expect(appContainer).toContainElement(articlesList);

    // For each articles, check that article_item_{id} is present
    mockArticles.forEach((article) => {
      const articleItem = getByTestId(`article_item_${article.id}`);
      expect(articleItem).toBeTruthy();
    });
  });

  it("Test 3: Validate that each article displayes the correct title and description", async () => {
    const mockArticles = [
      {
        id: "1",
        title: "Article 1",
        description: "Description 1",
      },
      {
        id: "2",
        title: "Article 2",
        description: "Description 2",
      },
    ];
    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockArticles,
    });

    const { getByTestId } = render(<App />);

    // Wait for the articles_list to appear
    await waitFor(() => expect(getByTestId("articles_list")).toBeTruthy());

    mockArticles.forEach((article) => {
      const titleElement = getByTestId(`article_title_${article.id}`);
      expect(titleElement).toBeTruthy();
      expect(titleElement.props.children).toBe(article.title);

      const descriptionElement = getByTestId(
        `article_description_${article.id}`
      );
      expect(descriptionElement).toBeTruthy();
      expect(descriptionElement.props.children).toBe(article.description);
    });
  });

  it("Test 4: Check error handling and alert display when the API reqeust fails", async () => {
    // Mock fetch to reject
    fetch.mockRejectedValue(new Error("Network Error"));

    const alertSpy = jest.spyOn(Alert, "alert");

    const { queryByTestId } = render(<App />);

    // Wait for the component to update after the failure
    await waitFor(() => {
      // Expect that loading indicator is no longer visible
      expect(queryByTestId("loading_indicator")).toBeNull();
    });

    // CHeck that Alert.alert was called with the correct parameters
    expect(alertSpy).toHaveBeenCalledWith("Error", "Failed to load articles.");
  });
});
