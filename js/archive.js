import { fetchSpesificImages, fetchCategory, url, params } from "./api-call.js";
import { formatDate, showLoadingIndicator } from "./global.js";
import { generalErrorMessage } from "./error-handling.js";

async function renderCategoryName() {
  try {
    //(title displayed on header)
    const currentCategory = await fetchCategory();
    const pageTitle = document.querySelector(".pagetitle");
    pageTitle.innerHTML += `${currentCategory[0].name}`;

    //(title in meta)
    const metaTitle = document.querySelector("#title");
    metaTitle.textContent += " : " + currentCategory[0].name;
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
}
renderCategoryName();

//REMEMBER TO render filepath.....

const id = params.get("id");
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
    console.log("Theres content missing in this post:", post);
  }
}

showLoadingIndicator(loader);

async function renderCategoriezedPosts() {
  try {
    const response = await fetch(url + `posts?categories=${id}&page=${page}`);

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
