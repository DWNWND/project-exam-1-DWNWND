//error-handling
// const errorMessage = "An error has occurred..."; //this should be updated dynamicly

//loading-indicator
// export function showLoadingIndicator(section) {
//   section.innerHTML = `<div class="loader"></div>`;
// }

//API-CALL
const url = "https://www.dwnwnd-api.online/wp-json/wp/v2/posts";
//getting the IDs
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("key");

//API call ALL blogposts (list)
export async function fetchAllBlogPosts() {
  try {
    const response = await fetch(url);
    const results = await response.json();
    console.log(results);
    return results;
  } catch (error) {
    // const main = document.querySelector("main");
    // main.innerHTML = `<div class="error-message montserrat bold red">${errorMessage}</div>`;
  }
}

//API call ALL categories (list)
export async function fetchJacketById() {
  try {
    const response = await fetch(url + "/" + id);
    const results = await response.json();
    return results;
  } catch (error) {
    // const main = document.querySelector("main");
    // main.innerHTML = `<div class="error-message montserrat bold brown">${errorMessage}</div>`;
  }
}

//API call post SPESIFIC (id-call)
