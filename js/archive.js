import { fetchSpesificImages, url, params } from "./api-call.js";
import { formatDate, showLoadingIndicator, openPostOnClick } from "./global.js";
import { generalErrorMessage } from "./error-handling.js";

const id = params.get("id");
const tag = params.get("tag");
const key = params.get("key");

const pageTitle = document.querySelector(".pagetitle");
const metaTitle = document.querySelector("#title");
const loader = document.querySelector(".loader-list");
const loadMoreBtn = document.querySelector(".more-btn");
const categorizedPostsWrapper = document.querySelector(".categorized-posts");
const pathDirectory = document.querySelector(".directory");

let urlParam;
let page = 1;
let postTitle;
let featuredImg;
let altText;
let excerpt;

showLoadingIndicator(loader);

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

    const page = await fetch(url + urlParam);

    if (!key && page.ok) {
      const currentTag = await page.json();
      pageTitle.innerHTML += `${currentTag.name}`;
      metaTitle.textContent += " : " + currentTag.name;
      pathDirectory.innerHTML = ` <a href="/./index.html">Home</a> > <a href="/html/archive.html?key=archive&id=19">Archive</a> > <a href="#">Category: ${currentTag.name}</a>`;
      //ADD DISPLAY THE TAG-NAME ON THE PAGE SOMEWHERE
    }
    if (!tag && page.ok) {
      const currentCategory = await page.json();
      pageTitle.innerHTML += `${currentCategory[0].name}`;
      metaTitle.textContent += " : " + currentCategory[0].name;
      pathDirectory.innerHTML = ` <a href="/./index.html">Home</a> > <a href="/html/archive.html?key=archive&id=19">Archive</a> > <a href="#">Category: ${currentCategory[0].name}</a>`;
    }
    if (key === "archive" && page.ok) {
      pathDirectory.innerHTML = ` <a href="/./index.html">Home</a> > <a href="/html/archive.html?key=archive&id=19">Archive</a>`;
    } else if (!page.ok) {
      throw new Error("Something went wrong when fetching the API for category/tag");
    }
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
}
renderPageName();

function renderPostContent(post) {
  if (post.title.rendered && post.excerpt.rendered) {
    postTitle = post.title.rendered;
    excerpt = post.excerpt.rendered;
  } else if (!post.title.rendered || !post.excerpt.rendered) {
    throw new Error("Theres content missing in this post:", post);
  }
}

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

    const posts = await fetch(`${url}posts?${urlParam}&page=${page}`);

    if (posts.ok) {
      const categorizedPosts = await posts.json();
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
          <article id="${categorizedPosts[i].id}">
            <h2>${postTitle}</h2>
            ${excerpt}
            <figure><img src="${featuredImg}" alt="${altText}" /></figure>
            <div class="post-metadata">
              <div class="publish-date"><date>${date[0]}, ${date[1]}</date></div>
              <a href="/html/post.html?key=${categorizedPosts[i].id}" class="continue-reading-cta">continue reading...</a>
            </div>
          </article>`;
        }
        openPostOnClick();
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
