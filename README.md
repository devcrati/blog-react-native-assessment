# CodeSignal React Native Assessment

This project is a React Native application using Expo, designed to display a list of articles. The application is structured to progressively add features across multiple levels, from rendering static data to integrating with a live API and implementing advanced features like search and navigation.

## Getting Started

To get started with this project, you can run the following commands:

```bash
npm install
npm run start
```

This will install the necessary dependencies and start the Expo development server. You can then use the QR code in the application log to open the app on your iOS or Android device.

## Features

### Level 1

- Render a list of articles using static JSON data.
- Display each article's title and description using `FlatList`.
- Apply provided styles for visual appeal.
- Ensure the list is scrollable and each article is properly separated.

### Level 2

- Replace static data with a dynamic API call using the `fetch` method.
- Manage loading states with an `ActivityIndicator`.
- Implement error handling for API requests.

### Level 3

- Use `expo-image` for efficient image caching.
- Add a search bar to filter articles by title or description.
- Implement navigation between the main news list and a "Saved Articles" screen.
- Enable users to save articles for later reading using `AsyncStorage`.

### Level 4

- Implement infinite scrolling to load more articles as the user scrolls.
- Enable pull-to-refresh functionality.
- Optimize `FlatList` for performance using props like `initialNumToRender` and `maxToRenderPerBatch`.
- Use `React.memo` and `useCallback` for component optimization.

## Configuration

Add your [configuration](https://codesandbox.io/docs/projects/learn/setting-up/tasks) to optimize it for [CodeSandbox](https://codesandbox.io/p/dashboard).

## API Information

The application fetches news articles from a RESTful API that provides paginated data. The endpoint is:

```
https://staging.codesignalcontent.com/newsArticles
```

## Testing

The project includes tests for each level, which can be run using the following commands:

```bash
npm run test1
npm run test2
npm run test3
npm run test4
```

These tests ensure that the application meets the specified acceptance criteria for each level.

## License

This project is licensed under the MIT License.
```

This README provides an overview of the project, its features, and instructions for getting started and testing. Adjust the content as needed to fit your specific project details.
