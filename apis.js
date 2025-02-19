export async function getNews(page = 1) {
  const API_URL = `https://staging.codesignalcontent.com/newsArticles?page=${page}`;
  // Implement the API call using fetch here
  const response = await fetch(API_URL);
  const data = response.json();
  return data;
}
