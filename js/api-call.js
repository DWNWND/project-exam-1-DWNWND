//error-handling
// const errorMessage = "An error has occurred..."; //this should be updated dynamicly

//loading-indicator
// export function showLoadingIndicator(section) {
//   section.innerHTML = `<div class="loader"></div>`;
// }

//API-CALL
const url = "https://www.dwnwnd-api.online/wp-json/wp/v2/";

//API call ALL blogposts (list)
const postQueryString = "posts?_embed";
export async function fetchAllBlogPosts() {
  try {
    const response = await fetch(url + postQueryString);
    const results = await response.json();
    return results;
  } catch (error) {
    // const main = document.querySelector("main");
    // main.innerHTML = `<div class="error-message montserrat bold red">${errorMessage}</div>`;
  }
}

//API call post SPESIFIC (id-call)
//getting the IDs
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
export const id = params.get("key");

export async function fetchPostById() {
  try {
    const response = await fetch(url + id);
    const results = await response.json();
    console.log(results);
    return results;
  } catch (error) {
    // const main = document.querySelector("main");
    // main.innerHTML = `<div class="error-message montserrat bold brown">${errorMessage}</div>`;
  }
}

//API call fetch images
export async function fetchSpesificImages(imgUrl) {
  try {
    const response = await fetch(imgUrl);
    const results = await response.json();
    // console.log(results);
    return results;
  } catch (error) {
    // const main = document.querySelector("main");
    // main.innerHTML = `<div class="error-message montserrat bold red">${errorMessage}</div>`;
  }
}

//API call categories
const categoriesQueryString = "categories";
export async function fetchAllCategories() {
  try {
    const response = await fetch(url + categoriesQueryString);
    const results = await response.json();
    // console.log(results);
    return results;
  } catch (error) {
    // const main = document.querySelector("main");
    // main.innerHTML = `<div class="error-message montserrat bold red">${errorMessage}</div>`;
  }
}

// https://www.dwnwnd-api.online/wp-json/wp/v2/posts?categories=8

//API call posts category SPESIFIC (id-call)
const categoryIDQueryString = "posts?categories=";
export async function fetchPostsByCategory() {
  try {
    const response = await fetch(url + categoryIDQueryString + id);
    // const response = await fetch(url + categoriesQueryString + "/" + id);
    const results = await response.json();
    // console.log(results);
    return results;
  } catch (error) {
    // const main = document.querySelector("main");
    // main.innerHTML = `<div class="error-message montserrat bold red">${errorMessage}</div>`;
  }
}

//API call pages
const pagesQueryString = "pages";
export async function fetchAllPages() {
  try {
    const response = await fetch(url + pagesQueryString);
    const results = await response.json();
    // console.log(results);
    return results;
  } catch (error) {
    // const main = document.querySelector("main");
    // main.innerHTML = `<div class="error-message montserrat bold red">${errorMessage}</div>`;
  }
}
