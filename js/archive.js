import { fetchSpesificImages, url, params } from "./api-call.js";
import { formatDate, showLoadingIndicator } from "./global.js";
import { generalErrorMessage } from "./error-handling.js";

const id = params.get("id");
const tag = params.get("tag");
const key = params.get("key");

const pageTitle = document.querySelector(".pagetitle");
const metaTitle = document.querySelector("#title");
const loader = document.querySelector(".loader-list");
const loadMoreBtn = document.querySelector(".more-btn");
const categorizedPostsWrapper = document.querySelector(".categorized-posts");

let urlParam;
let page = 1;
let postTitle;
let featuredImg;
let altText;
let excerpt;

async function renderPageName() {
  try {
    if (!key && tag) {
      urlParam = `tags/${tag}`;
    }
    if (key && !tag) {
      urlParam = `categories?slug=${key}`;
    } else if (!tag && !key) {
      throw new Error("Something went wrong when fetching the url params");
    }

    const response = await fetch(url + urlParam);

    if (!key && response.ok) {
      const currentTag = await response.json();
      pageTitle.innerHTML += `${currentTag.name}`;
      metaTitle.textContent += " : " + currentTag.name;
      //ADD DISPLAY THE TAG-NAME ON THE PAGE
    }
    if (!tag && response.ok) {
      const currentCategory = await response.json();
      pageTitle.innerHTML += `${currentCategory[0].name}`;
      metaTitle.textContent += " : " + currentCategory[0].name;
    } else if (!response.ok) {
      throw new Error("Something went wrong when fetching the API for category/tag");
    }
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
}
renderPageName();

//REMEMBER TO render filepath.....

//check and render post content
function renderPostContent(post) {
  if (post.title.rendered && post.excerpt.rendered) {
    postTitle = post.title.rendered;
    excerpt = post.excerpt.rendered;
  } else if (!post.title.rendered || !post.excerpt.rendered) {
    throw new Error("Theres content missing in this post:", post);
  }
}

showLoadingIndicator(loader);

async function renderCategoriezedPosts() {
  try {
    if (!id && tag) {
      urlParam = `tags=${tag}`;
    }
    if (id && !tag) {
      urlParam = `categories=${id}`;
    } else if (!id && !tag) {
      throw new Error("Something went wrong when fetching the url params");
    }

    const response = await fetch(`${url}posts?${urlParam}&page=${page}`);

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
      loadMoreBtn.removeEventListener("click", renderCategoriezedPosts);
    }
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
}
renderCategoriezedPosts();

loadMoreBtn.addEventListener("click", renderCategoriezedPosts);
