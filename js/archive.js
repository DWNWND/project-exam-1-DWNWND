import { fetchSpesificImages, url, params } from "./api-call.js";
import { formatDate, showLoadingIndicator } from "./global.js";
import { generalErrorMessage } from "./error-handling.js";

// //API call category SPESIFIC (key-call)
// async function fetchCategory() {
//   try {
//     const response = await fetch(url + categoriesQueryString + "?slug=" + key);
//     const results = await response.json();
//     return results;
//   } catch (error) {
//     apiErrorMessage(error);
//     console.log(error);
//   }
// }

const id = params.get("id");
const tag = params.get("tag");
const key = params.get("key");

let keyTagId;

const pageTitle = document.querySelector(".pagetitle");
const metaTitle = document.querySelector("#title");

async function renderCategoryName() {
  try {
    const responseTag = await fetch(url + "tags/" + tag);
    const responseSlug = await fetch(url + "categories?slug=" + key);

    if (!key && responseTag.ok) {
      const currentTag = await responseTag.json();
      pageTitle.innerHTML += `${currentTag.name}`;
      metaTitle.textContent += " : " + currentTag.name;
      //ADD DISPLAY THE TAG-NAME ON THE PAGE
    }
    if (!tag && !responseTag.ok && responseSlug.ok) {
      const currentCategory = await responseSlug.json();
      pageTitle.innerHTML += `${currentCategory[0].name}`;
      metaTitle.textContent += " : " + currentCategory[0].name;
    } else if (!responseTag.ok && !responseSlug.ok) {
      throw new Error("Something went wrong when fetching the category/tag");
    }
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
}
renderCategoryName();

// async function renderCategoryName() {
//   try {
//     const response = await fetch(url + categoriesQueryString + "?slug=" + key);

//     if (response.ok) {
//     const currentCategory = await response.json();
//     //(title displayed on header)
//     // const currentCategory = results
//     const pageTitle = document.querySelector(".pagetitle");
//     pageTitle.innerHTML += `${currentCategory[0].name}`;

//     //(title in meta)
//     const metaTitle = document.querySelector("#title");
//     metaTitle.textContent += " : " + currentCategory[0].name;
//     }
//   } catch (error) {
//     generalErrorMessage(error);
//     console.log(error);
//   }
// }
// renderCategoryName();

//REMEMBER TO render filepath.....

const loader = document.querySelector(".loader-list");
const categorizedPostsWrapper = document.querySelector(".categorized-posts");
const loadMoreBtn = document.querySelector(".more-btn");
let page = 1;
let postTitle;
let featuredImg;
let altText;
let excerpt;

//check and render post content
function renderPostContent(post) {
  if (post.title.rendered && post.excerpt.rendered) {
    postTitle = post.title.rendered;
    excerpt = post.excerpt.rendered;
  } else if (!post.title.rendered || !post.excerpt.rendered) {
    // console.log("Theres content missing in this post:", post);
    throw new Error("Theres content missing in this post:", post);
  }
}

showLoadingIndicator(loader);

async function renderCategoriezedPosts() {
  try {
    // const response = await fetch(url + `posts?categories=${id}&page=${page}`);
    // const response = await fetch(url + `posts?tags=${tag}&page=${page}`);

    // if (!id && tag) {
    //   keyTagId = `tags=${tag}`;
    //   console.log("this is a tag");
    // }
    // if (!tag && id) {
    //   keyTagId = `categories=${id}`;
    //   console.log("this is a category");
    // } else if (!tag && !id) {
    //   throw new Error("Something went wrong when fetching the url params");
    // }

    const response = await fetch(url + "posts?" + keyTagId + `&page=${page}`);

    if (response.ok) {
      const categorizedPosts = await response.json();
      loader.innerHTML = "";

      if (categorizedPosts.length === 0) {
        loader.innerHTML = "We don't have any posts in this category yet..";
        loadMoreBtn.classList.add("hidden");
      } else {
        for (let i = 0; i < categorizedPosts.length; i++) {
          renderPostContent(categorizedPosts[i]);

          //check and render img
          if (categorizedPosts[i]._links["wp:featuredmedia"]) {
            const imageApi = categorizedPosts[i]._links["wp:featuredmedia"]["0"].href;
            const img = await fetchSpesificImages(imageApi);
            featuredImg = img.source_url;
            altText = img.alt_text;
          } else if (!categorizedPosts[i]._links["wp:featuredmedia"]) {
            console.log("You need to add a featured img to this/these post(s): ", post);
          }

          const date = formatDate(categorizedPosts[i].date);

          categorizedPostsWrapper.innerHTML += `
          <article>
            <h2>${postTitle}</h2>
            ${excerpt}
            <figure class="figure-general"><img src="${featuredImg}" alt="${altText}" /></figure>
            <div class="post-info">
              <div class="publish-date"><date>${date[0]}, ${date[1]}</date></div>
              <a href="/html/post.html?key=${categorizedPosts[i].id}" class="continue-btn">continue reading...</a>
            </div>
          </article>`;
        }
        page++;
      }
    } else {
      loadMoreBtn.innerText = "All posts in this category are on display";
      loadMoreBtn.classList.add("all-posts-are-displayed");
    }
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
}
renderCategoriezedPosts();

loadMoreBtn.addEventListener("click", renderCategoriezedPosts);
