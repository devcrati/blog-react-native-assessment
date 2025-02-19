import React, { useCallback } from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import NewsList from "../../NewsList";
import Article from "../../Article";
import { NavigationContainer } from "@react-navigation/native";
import { useKeepAwake } from "expo-keep-awake";

jest.mock("react", () => {
  const actualReact = jest.requireActual("react");
  return {
    ...actualReact,
    useCallback: jest.fn((fn, deps) => actualReact.useCallback(fn, deps)),
  };
});

global.fetch = jest.fn();

jest.mock("expo-keep-awake", () => ({
  useKeepAwake: jest.fn().mockReturnValue(true), //Mock to keep the screen awake
}));

describe("NewsList Component, Level 4", () => {
  beforeEach(() => {
    fetch.mockReset();

    // Mock `fetch` to handle pagination
    let callCount = 0;

    fetch.mockImplementation(() => {
      callCount += 1;
      const startId = (callCount - 1) * 10 + 1;
      return Promise.resolve({
        json: () =>
          Promise.resolve(
            Array.from({ length: 10 }, (_, i) => ({
              id: `${startId + i}`,
              title: `Article ${startId + i}`,
              description: `Description for article ${startId + i}`,
              image: `https://example.com/image${startId + i}.png`,
            }))
          ),
      });
    });
  });

  it("Test 1: implements infinite scrolling to load more articles as user scrolls to bottom", async () => {
    const { getByTestId, getAllByTestId } = render(
      <NavigationContainer>
        <NewsList />
      </NavigationContainer>
    );

    // Wait for initial articles to be loaded
    await waitFor(() => {
      expect(getAllByTestId(/^article_item_/).length).toBe(10);
    });

    // Simulate scrolling to the end of the FlatList
    const articlesList = getByTestId("articles_list");

    await act(async () => {
      fireEvent(articlesList, "onEndReached");
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });

  it("Test 2: enables pull-to-refresh by pulling down from the top of the list", async () => {
    const { getByTestId, getAllByTestId } = render(
      <NavigationContainer>
        <NewsList />
      </NavigationContainer>
    );

    // Wait for initial articles to be loaded
    await waitFor(() => {
      expect(getAllByTestId(/^article_item_/).length).toBe(10);
    });

    // Simulate pull-to-refresh
    const articlesList = getByTestId("articles_list");

    await act(async () => {
      fireEvent(articlesList, "onRefresh");
    });

    // Wait for the refresh to complete
    await waitFor(() => {
      // Check that fetch was called again on refresh
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    // Ensure that the articles list updates (number of articles remains the same)
    expect(getAllByTestId(/^article_item_/).length).toBe(10);
  });

  it("Test 3: optimizes FlatList with specified props", async () => {
    const { getAllByTestId, getByTestId } = render(
      <NavigationContainer>
        <NewsList />
      </NavigationContainer>
    );

    // Wait for initial articles to be loaded
    await waitFor(() => {
      expect(getAllByTestId(/^article_item_/)).toBeTruthy();
    });

    // Get the FlatList component
    const articlesList = getByTestId("articles_list");

    // Check that the FlatList has the specified props for performance optimization
    expect(articlesList.props.initialNumToRender).toBe(10);
    expect(articlesList.props.maxToRenderPerBatch).toBe(5);
    expect(articlesList.props.windowSize).toBe(21);
    expect(articlesList.props.updateCellsBatchingPeriod).toBe(50);
  });
});

describe("Article Component, Level 4", () => {
  it("Test 1: memoizes Article component with React.memo to avoid unnecessary re-renders", () => {
    const REACT_MEMO_TYPE = Symbol.for("react.memo");
    expect(Article.$$typeof).toBe(REACT_MEMO_TYPE);
  });
});
