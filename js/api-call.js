//error-handling fetching API
let errorMessage;
function generateErrorMessage(err) {
  errorMessage = `
  <div class="error-message">
    <span>Our apologies, we have encoutered an issue with our database.</span>
    <span>Please refresh your site and give us a few minutes to figure this one out.</span>
  </div>
  <span>If the error continues please reach out to our customer service and present the following information:</span>
  <span><b>Error name:</b> ${err.name}</span>
  <span><b>Error message:</b> ${err.message}</span>`;
}
//loading-indicator
// export function showLoadingIndicator(section) {
//   section.innerHTML = `<div class="loader"></div>`;
// }

//API-URL
const url = "https://www.dwnwnd-api.online/wp-json/wp/v2/";

//getting the IDs
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
export const id = params.get("key");

//API call ALL posts (list)
const postQueryString = "posts?_embed";
export async function fetchAllBlogPosts() {
  try {
    const response = await fetch(url + postQueryString);
    const results = await response.json();
    return results;
  } catch (error) {
    generateErrorMessage(error);
    const main = document.querySelector("main");
    main.innerHTML = `
    <section class="error-section">
      <div class="error-message-wrapper">${errorMessage}</div>
    </section>`;
  }
}

//API call post SPESIFIC (id-call)
const postsQueryString = "posts/";
export async function fetchPostById() {
  try {
    const response = await fetch(url + postsQueryString + id);
    const results = await response.json();
    return results;
  } catch (error) {
    generateErrorMessage(error);
    const main = document.querySelector("main");
    main.innerHTML = `
    <section class="error-section">
      <div class="error-message-wrapper">${errorMessage}</div>
    </section>`;
  }
}

//API call ALL categories (list)
const categoriesQueryString = "categories";
export async function fetchAllCategories() {
  try {
    const response = await fetch(url + categoriesQueryString);
    const results = await response.json();
    return results;
  } catch (error) {
    generateErrorMessage(error);
    const main = document.querySelector("main");
    main.innerHTML = `
    <section class="error-section">
      <div class="error-message-wrapper">${errorMessage}</div>
    </section>`;
  }
}

//API call category SPESIFIC (id-call)
export async function fetchCategory() {
  try {
    const response = await fetch(url + categoriesQueryString + "/" + id);
    const results = await response.json();
    return results;
  } catch (error) {
    generateErrorMessage(error);
    const main = document.querySelector("main");
    main.innerHTML = `
    <section class="error-section">
      <div class="error-message-wrapper">${errorMessage}</div>
    </section>`;
  }
}

//API call posts in category SPESIFIC (id-call)
const categoryIDQueryString = "posts?categories=";
export async function fetchPostsByCategory() {
  try {
    const response = await fetch(url + categoryIDQueryString + id);
    const results = await response.json();
    return results;
  } catch (error) {
    generateErrorMessage(error);
    const main = document.querySelector("main");
    main.innerHTML = `
    <section class="error-section">
      <div class="error-message-wrapper">${errorMessage}</div>
    </section>`;
  }
}

//API call all pages (list)
const pagesQueryString = "pages";
export async function fetchAllPages() {
  try {
    const response = await fetch(url + pagesQueryString);
    const results = await response.json();
    return results;
  } catch (error) {
    generateErrorMessage(error);
    const main = document.querySelector("main");
    main.innerHTML = `
    <section class="error-section">
      <div class="error-message-wrapper">${errorMessage}</div>
    </section>`;
  }
}
//API call post-spesific comments
export async function fetchComments(commentUrl) {
  try {
    const response = await fetch(commentUrl);
    const results = await response.json();
    return results;
  } catch (error) {
    generateErrorMessage(error);
    const main = document.querySelector("main");
    main.innerHTML = `
    <section class="error-section">
      <div class="error-message-wrapper">${errorMessage}</div>
    </section>`;
  }
}

//API call post-spesific images
export async function fetchSpesificImages(imgUrl) {
  try {
    const response = await fetch(imgUrl);
    const results = await response.json();
    return results;
  } catch (error) {
    generateErrorMessage(error);
    const main = document.querySelector("main");
    main.innerHTML = `
    <section class="error-section">
      <div class="error-message-wrapper">${errorMessage}</div>
    </section>`;
  }
}
