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
    if (response.ok) {
      const results = await response.json();
      return results;
    } else {
      throw new Error("Error when executing fetchAllBlogPosts - fetching API");
    }
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
    if (response.ok) {
      const results = await response.json();
      return results;
    } else {
      throw new Error("Error when executing fetchPostById - fetching API");
    }
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
    if (response.ok) {
      const results = await response.json();
      return results;
    } else {
      throw new Error("Error when executing fetchAllCategories - fetching API");
    }
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
    if (response.ok) {
      const results = await response.json();
      return results;
    } else {
      throw new Error("Error when executing fetchPostsByCategory - fetching API");
    }
  } catch (error) {
    apiErrorMessage(error);
    console.log(error);
  }
}

// //API call all pages (list)
// const pagesQueryString = "pages";
// export async function fetchAllPages() {
//   try {
//     const response = await fetch(url + pagesQueryString);
//     if (response.ok) {
//       const results = await response.json();
//       return results;
//     } else {
//       throw new Error("Error when executing fetchAllPages - fetching API");
//     }
//   } catch (error) {
//     apiErrorMessage(error);
//     console.log(error);
//   }
// }
//API call post-spesific comments
export async function fetchComments(commentUrl) {
  try {
    const response = await fetch(commentUrl);
    if (response.ok) {
      const results = await response.json();
      return results;
    } else {
      throw new Error("Error when executing fetchComments - fetching API");
    }
  } catch (error) {
    apiErrorMessage(error);
    console.log(error);
  }
}

//API call post-spesific images
export async function fetchSpesificImages(imgUrl) {
  try {
    const response = await fetch(imgUrl);
    if (response.ok) {
      const results = await response.json();
      return results;
    } else {
      throw new Error("Error when executing fetchSpesificImages - fetching API");
    }
  } catch (error) {
    apiErrorMessage(error);
    console.log(error);
  }
}
