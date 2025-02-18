export async function getNews() {
  const API_URL = "https://staging.codesignalcontent.com/newsArticles";
  // Implement the API call using fetch here
  const response = await fetch(API_URL);
  const data = response.json();
  return data;
}
