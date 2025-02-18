# Overview

Develop a React Native application that displays a list of articles. The app should showcase each article's title and description in a clean and visually appealing manner using the provided styling guidelines.

Note: This question has four levels, each requiring you to progressively add more features to the same app, building on your previous work. At each level, focus only on what is necessary to pass the unit tests.

# Task

`Objective`: Render a list of articles using static JSON data.

### Requirements:

- Use `FlatList` to display a list of articles, showing each article's `title` and `description` from a static dataset.
- Apply the provided `styles` from the started code to your components to enhance the visual appeal with flat colors.
- Ensure each article item is properly separated and the list is scrollable.
- Maintain the existing file structure and filenames (`App.js`, `Article.js`, `NewsList.js`).

# Test Identifiers

To faciliatate automated testing, please apply the following `testID`s to the specified components in your application:

- Assign `testID="app_title"` to the main title text component of the app.
- Assign `testID="articles_list` to the `FlatList` component responsible for rendering the list of articles.
- For each article item in the list:
  -- Assign `testID="article_item_${item.id}"` to the root component that wraps the entire article item.
  -- Assign `testID="article_title_${item.id}"` to the text component displaying the article's title.
  -- Assign `testID="article_description_${item.id}` to the text component displaying the article's description.

# Acceptance Criteria

```
Scenario: Level 1 Teest 1: verifies the main app title "Ne"
```
