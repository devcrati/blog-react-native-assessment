import React from "react";
import { render, within, waitFor } from "@testing-library/react-native";
import App from "../../App";
import setupLevel from "./setupLevel";
import { articles } from "../../data";

jest.mock("expo-keep-awake", () => ({
  useKeepAwake: jest.fn().mockReturnValue(true), // Mock to keep the screen awake
}));

describe("App Component, Level 1", () => {
  beforeAll(async () => {
    setupLevel();

    // Dummy render to warm up the environment
    const { getByTestId } = render(<App />);

    await waitFor(() => {
      const titleElement = getByTestId("app_container");
      expect(titleElement).toBeTruthy();
    });
  });

  it('Test 1: verifies the main app title "News Today" is rendered with testID="app_title"', async () => {
    const { getByTestId } = render(<App />);
    await waitFor(
      () => {
        const titleElement = getByTestId("app_title");
        expect(titleElement).toBeTruthy();
        expect(titleElement.props.children).toBe("News Today");
      },
      {
        timeout: 2000,
      }
    );
  });

  it('Test 2: ensures the FlatList with testID="articles_list" renders exactly 10 articles', async () => {
    const { getByTestId, getAllByTestId } = render(<App />);

    await waitFor(
      () => {
        const flatList = getByTestId("articles_list");
        expect(flatList).toBeTruthy();
        const articleContainers = getAllByTestId(/^article_item_/);
        expect(articleContainers.length).toBe(10);
      },
      {
        timeout: 2000,
      }
    );
  });

  it("Test 3: validates each article item has correct container, title, and description testIDs", async () => {
    const { getByTestId } = render(<App />);
    await waitFor(
      () => {
        articles.forEach((item) => {
          const container = getByTestId(`article_item_${item.id}`);
          expect(container).toBeTruthy();

          const title = getByTestId(`article_title_${item.id}`);
          expect(title).toBeTruthy();
          expect(title.props.children).toBe(item.title);

          const description = getByTestId(`article_description_${item.id}`);
          expect(description).toBeTruthy();
          expect(description.props.children).toBe(item.description);
        });
      },
      {
        timeout: 2000,
      }
    );
  });

  it('Test 4: verifies that SafeAreaView with testID="app_container" includes the main title and the FlatList of articles', async () => {
    const { getByTestId } = render(<App />);
    await waitFor(
      () => {
        const appContainer = getByTestId("app_container");
        expect(appContainer).toBeTruthy();

        const { getByTestId: getByTestIdWithin } = within(appContainer);

        const title = getByTestIdWithin("app_title");
        expect(title).toBeTruthy();

        const flatList = getByTestIdWithin("articles_list");
        expect(flatList).toBeTruthy();
      },
      {
        timeout: 2000,
      }
    );
  });

  it("Test 5: ensures all testIDs assigned to article components are unique and correctly formatted", async () => {
    const { getAllByTestId } = render(<App />);

    await waitFor(
      () => {
        const articleContainers = getAllByTestId(/^article_item_/);
        const articleContainerTestIDs = articleContainers.map(
          (element) => element.props.testID
        );
        articleContainerTestIDs.forEach((testID) => {
          expect(testID).toMatch(/^article_item_\d+$/);
        });
        const uniqueContainerTestIDs = new Set(articleContainerTestIDs);
        expect(uniqueContainerTestIDs.size).toBe(
          articleContainerTestIDs.length
        );
      },
      {
        timeout: 2000,
      }
    );

    await waitFor(
      () => {
        const articleTitles = getAllByTestId(/^article_title_/);
        const articleTitleTestIDs = articleTitles.map(
          (element) => element.props.testID
        );
        articleTitleTestIDs.forEach((testID) => {
          expect(testID).toMatch(/^article_title_\d+$/);
        });
        const uniqueDescriptionTestIDs = new Set(articleTitleTestIDs);
        expect(uniqueDescriptionTestIDs.size).toBe(articleTitleTestIDs.length);
      },
      { timeout: 2000 }
    );
  });
});
