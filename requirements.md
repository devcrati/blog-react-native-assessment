# Level 1

## Overview

Develop a React Native application that displays a list of articles. The app should showcase each article's title and description in a clean and visually appealing manner using the provided styling guidelines.

Note: This question has four levels, each requiring you to progressively add more features to the same app, building on your previous work. At each level, focus only on what is necessary to pass the unit tests.

## Task

`Objective`: Render a list of articles using static JSON data.

### Requirements:

- Use `FlatList` to display a list of articles, showing each article's `title` and `description` from a static dataset.
- Apply the provided `styles` from the started code to your components to enhance the visual appeal with flat colors.
- Ensure each article item is properly separated and the list is scrollable.
- Maintain the existing file structure and filenames (`App.js`, `Article.js`, `NewsList.js`).

## Test Identifiers

To faciliatate automated testing, please apply the following `testID`s to the specified components in your application:

- Assign `testID="app_title"` to the main title text component of the app.
- Assign `testID="articles_list` to the `FlatList` component responsible for rendering the list of articles.
- For each article item in the list:
  -- Assign `testID="article_item_${item.id}"` to the root component that wraps the entire article item.
  -- Assign `testID="article_title_${item.id}"` to the text component displaying the article's title.
  -- Assign `testID="article_description_${item.id}` to the text component displaying the article's description.

## Acceptance Criteria

```
Scenario: Level 1 Test 1: verifies the main app title "News Today" is rendered with testID="app_title"
  Given the App component is rendered
  When the component with testID "app_title" is present
  Then the title element should be visible
  And the title element should display the text "News Today"
```

```
Scenario: Level 1 Test 2: ensures the FlatList with testID="articles_list" renders exactly 10 articles
  Given the App component is rendered
  When the FlatList component with testID "articles_list" is present
  Then the FlatList should contain exactly 10 article items
  And each article item should be individually rendered with a testID that starts with "article_item_"
```

```
Scenario: Level 1 Test 3: verifies the article title is rendered correctly
  Given the App component is rendered
  When the list of articles is displayed
  Then each article item should have a container with a unique testID
  And each article item's title should have a unique testID
  And each article item's description should have a unique testID
  And each title should display the correct article title
  And each description should display the correct article description
```

```
Scenario: Level 1 Test 4: verifies that SafeAreaView with testID="app_container" is rendered
  Given the App component is rendered
  When the SafeAreaView component with testID "app_container" is present
  Then the SafeAreaView should contain a title element with testID "app_title"
  And the SafeAreaView should contain a FlatList component with testID "articles_list"
```

```
Scenario: Level 1 Test 5: ensures all testIDs assigned to components are unique
  Given the App component is rendered
  When accessing all testIDs for article containers, titles, and descriptions
  Then each article container testID should follow the pattern "article_item_${item.id}"
  And each article title testID should follow the pattern "article_title_${item.id}"
  And each article description testID should follow the pattern "article_description_${item.id}"
```

# Level 2

## Overview

Continue enhancing the React Native application developed at the previous level, which displays a list of news articles. The current version uses static data, and your objective is to integrate it with a live API to fetch real-time articles. Additionally, you will implement user-friendly loading indicators and error handling to improve the application's reliability and user experience.

## API Information

The application fetches news articles from a RESTful API that provides paginated data.

Endpoint:
- GET
```
https://staging.codesignalcontent.com/newsArticles
```

Example Request:
```
GET /newsArticles
```

Example Response:
```
{
  [
    {
      "id": "6",
      "title": "Entertainment: Award-Winning Movie Now Streaming",
      "description": "The critically acclaimed film is now available on popular streaming platforms.",
      "image": "https://codesignal-staging-assets.s3.amazonaws.com/uploads/1731575733231/p_entertainment.png",
    },
    {
      "id": "7",
      "title": "Travel Guide: Top Destinations for 2024",
      "description": "Explore the most sought-after travel destinations for the upcoming year.",
      "image": "https://codesignal-staging-assets.s3.amazonaws.com/uploads/1731575734068/p_travel.png",
    },
  ],
}
```

## Task

`API Integration`:

- Replace the static data in `App.js` with a dynamic API call using the `fetch` method.
- Use the `getNews` function from `apis.js` to retrieve articles from the News API.

`Loading States`:

- Manage the loading state by displaying an `ActivityIndicator` component while the articles are being fetched.
- Ensure that the loading indicator is visible until the data is successfully loaded or an error occurs.

`Error Handling`:

- Implement error handling to gracefully manage any issues that arise during the API call.
- Display an alert message if the API request falls, informing the user that the articles could not be loaded.

Your implementation should maintain the existing file structure and filenames, as well as the styling of the application while adding the required functionalities.

## Test Identifiers

To faciliatate automated testing of your application, please include the following `testID` props in the specified components:

`App Container`:

- Assign `testID="app_container"` to the root `SafeAreaView` component in `App.js`.

`Loading Indicator`:

- Assign `testID="loading_indicator"` to the `ActivityIndicator` component that is displayed while the articles are being fetched.

`Application Title`:

- Assign `testID="app_title"` to the `Text` component that displays the application's title.

`Articles List`:

- Assign `testID="articles_list"` to the `FlatList` component that renders the list of news articles.

`Article Items`:

- Within the `Article` component (in `Article.js`), assign
  -- `testID="article_item_{id}"` to the root `View` component of each article item, where `{id}` is the unique identifier of the article.
  -- `testID="article_title_{id}"` to the `Text` component that displays the article's title.
  -- `testID="article_description_{id}"` to the `Text` component that displays the article's description.

## Acceptance Criteria

```
Scenario: Level 2 Test 1: Verify that the loading indicator is displayed when the articles are being fetched
  Given the App component is rendered and begins fetching articles
  When the API call is in progress
  Then an ActivityIndicator with testID "loading_indicator" should be visible
  And the FlatList with testID "articles_list" should not be visible
  And the ActivityIndicator should be a descendant of the SafeAreaView with testID "app_container"
```

```
Scenario: Level 2 Test 2: Confirm that the application title is displayed
  Given the App component is rendered
  And the API successfully returns a list of articles
  When the data fetching is completed
  Then a Text component with testID "app_title" displaying the title "News Today" should be visible
  And a FlatList with testID "articles_list" should be rendered
  And the FlatList should be a descendant of the SafeAreaView with testID "app_container"
  And each article item should have a corresponding testID
```

```
Scenario: Level 2 Test 3: Validate that each article displays its title and description
  Given the App component is rendered
  And the API successfully returns a list of articles with titles and descriptions
  When the articles are displayed in the FlatList
  Then each article item should contain a Text component with testID "article_title_{id}"
  And each article item should contain a Text component with testID "article_description_{id}"
```

```
Scenario: Level 2 Test 4: Check error handling and alert display
  Given the App component is rendered
  And the API request fails due to a network error
  When the API call is attempted
  Then an alert with the title "Error" and message "Failed to fetch articles" should be displayed
  And the loading indicator with testID "loading_indicator" should not be visible
```

# Level 3

## Overview

Continue enhancing the React Native application developed at the previous levels for displaying and managing articles by adding interactive features and navigation. Your improvements should focus on image handling, search functionality, navigation between screens, and the ability to save articles for later reading.

## Task

`Image Handling`:

- Use `expo-image` to display article images, ensuring efficient image caching.

`Search Functionality`:

- Add a search bar that allows users to filter articles based on the `title` or `description`.

`Navigation`:

- Implement navigation between the main news list and a "Saved Articles" screen using `React Navigation`.

`Save for Later`

- Enable users to save articles for later reading by adding a save button. Persist the saved articles using `AsyncStorage`.

Maintain the existing file structure and filenames.

## Test Identifiers

To facilitate automated testing of your application, please include the following `testID` attributes in your components:

`App Container`

- Assign `testID="app_container"` to the main wrapping component (`View` or `SafeAreaView`) in each of the following files:
  -- `NewsList.js`: The main news list screen.
  -- `SavedArticles.js`: The saved articles screen.

`App Title`

- Assign `testID="app_title"` to the `Text` component that displays the screen's title in:
  -- `NewsList.js`: Typically displaying "News Today" or a similar title.
  -- `SavedArticles.js`: Displaying "Saved Articles" or the appropriate title for the saved articles screen.

`Articles List`

- Assign `testID="articles_list"` to the `FlatList` (or equivalent list component) in:
  -- `NewsList.js`: The list showing all available news articles.
  -- `SavedArticles.js`: The list showing the user's saved articles.

`Article Item Components`

For each article item rendered in the list:

- Assign `testID={article_item_${item.id}}` to the root component of each article item. Replace `${item.id}` with the unique identifier of the article.
- Assign `testID={article_title_${item.id}}` to the `Text` component displaying the article's title.
- Assign `testID={article_description_${item.id}}` to the `Text` component displaying the article's description.
- Assign `testID={save_button_${item.id}}` to the save button within each article item in `NewsList.js`.

`Search Input`

- Assign `testID="search_input"` to the `TextInput` component used for searching articles in `NewsList.js`.

`Navigation Buttons`

- Assign `testID="navigate_saved_articles_button"` to the button in `NewsList.js` that, when pressed, navigates to the saved articles screen.
- Assign `testID="back_button"` to the button in `SavedArticles.js` that, when pressed, returns to the main news list screen.

`Loading Indicator`

- Assign `testID="loading_indicator"` to the `ActivityIndicator` component in `NewsList.js` that appears when the app is loading data.

## Acceptance Criteria

```
Scenario: Level 3 Test 1: Image Handling with `expo-image`
  Given the NewsList component is rendered
    And the API returns a list of articles each containing an image URL
  When the articles are displayed in the articles list
  Then each article item should render an `expo-image` component
    And the `expo-image` component's source URI should match the article's `image` URL
```

```
Scenario: Level 3 Test 2: Search Functionality
  Given the NewsList component is rendered with a list of articles
    And each article has a `title` and `description`
  When a user enters text into the search input with testID "search_input"
    And the search query matches the `title` or `description` of an article
  Then the articles list should display only the articles that match the search query
    And the articles that do not match the search query should not be visible
  When the search input is cleared
  Then all articles should be displayed in the articles list
```

```
Scenario: Level 3 Test 3: Navigation Between Screens
  Given the App component is rendered
    And the initial screen displayed is the NewsList screen
  When the user presses the button with testID "navigate_saved_articles_button"
  Then the app should navigate to the SavedArticles screen
    And the SavedArticles screen should display the title
  When the user presses the button with testID "back_button"
  Then the app should navigate back to the NewsList screen
    And the NewsList screen should display the title "News Today"
```
  
```
Scenario: Level 3 Test 4: Save for Later Functionality
  Given the App component is rendered
    And the NewsList screen displays a list of articles
    And there are no articles saved initially in AsyncStorage
  When the user presses the save button with testID "save_button_{id}" for an article
  Then the article should be saved to AsyncStorage under the key "saved_articles"
    And a confirmation alert saying "This article has been saved" should be displayed
  When the user navigates to the SavedArticles screen by pressing the button with testID "navigate_saved_articles_button"
    And the SavedArticles screen fetches saved articles from AsyncStorage
  Then the SavedArticles screen should display the saved articles
    And the article's title should be "First Article"
    And the article's description should be "Description 1"
```

# Level 4

## Overview

Continue enhancing the React Native application developed at the previous levels for displaying and managing news articles. Your task is to enhance the application by implementing advanced features and optimizing its performance to ensure a smooth user experience.

## API Information

The application fetches news articles from a RESTful API that provides paginated data.

Endpoint:
- GET
```
https://staging.codesignalcontent.com/newsArticles
```

Query Parameters:
- `pageSize` (optional): Number of articles per page (default is `10`).
- `page` (optional): Page number to retrieve (default is `1`).

Example Request:
```
GET /newsArticles?pageSize=5&page=2
```

Example Response:
```
{
  [
    {
      "id": "6",
      "title": "Entertainment: Award-Winning Movie Now Streaming",
      "description": "The critically acclaimed film is now available on popular streaming platforms.",
      "image": "https://codesignal-staging-assets.s3.amazonaws.com/uploads/1731575733231/p_entertainment.png",
    },
    {
      "id": "7",
      "title": "Travel Guide: Top Destinations for 2024",
      "description": "Explore the most sought-after travel destinations for the upcoming year.",
      "image": "https://codesignal-staging-assets.s3.amazonaws.com/uploads/1731575734068/p_travel.png",
    },
  ],
}
```

## Task

### Advanced Features and Performance Optimization

Pagination:

- Implement infinite scrolling to load more articles as the user reaches the bottom of the list.

Pull-to-Refresh:

- Enable users to refresh the article list by pulling down from the top of the list.

Performance Optimization:

- Optimize the `FlatList` component by configuring props such as `initialNumToRender` and `maxToRenderPerBatch`.
- Apply memoization techniques using `React.memo` and `useCallback` to avoid unnecessary re-renders of components.

Requirements:

- Maintain the existing file structure and filenames.
- Utilize the following libraries:
  -- `@react-native-async-storage/async-storage`
  -- `expo-image`

## Acceptance Criteria

```
Scenario: Level 4 Test 1: Infinite scrolling loads additional articles
  Given the NewsList component is rendered
  And the initial set of 10 articles is displayed
  When the user scrolls to the bottom of the articles list
  Then the application should trigger a fetch request to the API with the next page number
  And the API should return the next set of 10 articles
  And the newly fetched articles should be appended to the existing list
  And the total number of displayed articles should increase by 10
  And a loading indicator should be visible while fetching the new articles
  And the loading indicator should disappear after the articles are loaded
```

```
Scenario: Level 4 Test 2: Pull-to-refresh reloads the articles list
  Given the NewsList component is rendered
  And a list of 10 articles is currently displayed
  When the user performs a pull-to-refresh gesture at the top of the list
  Then the application should initiate a fetch request to the API with the first page
  And the API should return the latest set of 10 articles
  And the existing list of articles should be cleared
  And the refreshed list of 10 articles should be displayed
  And a loading indicator should be visible during the refresh process
  And the loading indicator should disappear once the refresh is complete
```

```
Scenario: Level 4 Test 3: FlatList is optimized with specific props
  Given the NewsList component is rendered
  When the FlatList component within NewsList is rendered
  Then the FlatList should have the prop `initialNumToRender` set to `5`
  And the FlatList should have the prop `maxToRenderPerBatch` set to `10`
  And the FlatList should have the prop `windowSize` set to `10`
  And the FlatList should have the prop `removeClippedSubviews` set to `true`
  And these prop configurations should contribute to improved performance
```

```
Scenario: Level 4 Test 4: Article component is memoized using React.memo
  Give the Article component is defined in the project
  When the Article component is exported
  Then the Article component should be wrapped with `React.memo`
  And the memoized Article component should only re-render when its props have changed
  And unnecessary re-renders of the Article component should be avoided
  And this optimization should contribute to improved performance
```