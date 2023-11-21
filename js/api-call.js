import { apiErrorMessage } from "./error-handling.js";

//API-URL
export const url = "https://www.dwnwnd-api.online/wp-json/wp/v2/";

//getting the IDs
const queryString = document.location.search;
export const params = new URLSearchParams(queryString);
export const key = params.get("key");

//API call ALL posts (list) &page=100
const postQueryString = "posts?_embed&per_page=100";
export async function fetchAllBlogPosts() {
  try {
    const response = await fetch(url + postQueryString);
    const results = await response.json();
    return results;
  } catch (error) {
    apiErrorMessage(error);
    console.log(error);
  }
}

//API call post SPESIFIC (id-call)
const postsQueryString = "posts/";
export async function fetchPostById() {
  try {
    const response = await fetch(url + postsQueryString + key);
    const results = await response.json();
    return results;
  } catch (error) {
    apiErrorMessage(error);
    console.log(error);
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
    apiErrorMessage(error);
    console.log(error);
  }
}

// //API call posts in category SPESIFIC (key-call)
const categoryIDQueryString = "posts?categories?slug=";
export async function fetchPostsByCategory() {
  try {
    const response = await fetch(url + categoryIDQueryString + key);
    const results = await response.json();
    return results;
  } catch (error) {
    apiErrorMessage(error);
    console.log(error);
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
    apiErrorMessage(error);
    console.log(error);
  }
}
//API call post-spesific comments
export async function fetchComments(commentUrl) {
  try {
    const response = await fetch(commentUrl);
    const results = await response.json();
    return results;
  } catch (error) {
    apiErrorMessage(error);
    console.log(error);
  }
}

//API call post-spesific images
export async function fetchSpesificImages(imgUrl) {
  try {
    const response = await fetch(imgUrl);
    const results = await response.json();
    return results;
  } catch (error) {
    apiErrorMessage(error);
    console.log(error);
  }
}
