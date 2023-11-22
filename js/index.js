import { fetchAllBlogPosts, url } from "./api-call.js";
import { showLoadingIndicator, showMoreBtn, openPostOnClick } from "./global.js";
import { generalErrorMessage } from "./error-handling.js";

let postTitle;
let featuredImg;
let altText;
let excerpt;
let linkToMore;

const newlyPublishedSection = document.querySelector(".newly-published-section");
const slider = document.querySelector(".slider");
const popularPostsSection = document.querySelector(".popular-posts-section");
const popularPostsWrapper = document.querySelector(".popular-posts-wrapper");
const aboutUsWrapper = document.querySelector(".about-us-wrapper");

const prev = document.querySelector(".prev-btn");
const next = document.querySelector(".next-btn");

//how far the slider should scroll:
const itemWidth = 250;
const padding = 0;

const loader1 = document.querySelector(".loader-newly-published");
const loader2 = document.querySelector(".loader-popular-posts");
const loader3 = document.querySelector(".loader-about-us-index");

showLoadingIndicator(loader1);
showLoadingIndicator(loader2);
showLoadingIndicator(loader3);

//control and render post content
function renderPostContent(post) {
  if (post.title.rendered && post.excerpt.rendered && post._embedded["wp:featuredmedia"]) {
    postTitle = post.title.rendered;
    excerpt = post.excerpt.rendered;
    featuredImg = post._embedded["wp:featuredmedia"]["0"].source_url;
    altText = post._embedded["wp:featuredmedia"]["0"].alt_text;
  } else if (!post.title.rendered || !post.excerpt.rendered || !post._embedded["wp:featuredmedia"]) {
    console.log("Theres content missing in this post:", post);
  }
}

//render newly published blogposts to slider
async function renderNewlyPublishedPosts() {
  try {
    const allPosts = await fetchAllBlogPosts();
    loader1.innerHTML = "";

    for (let i = 0; i < allPosts.length; i++) {
      renderPostContent(allPosts[i]);
      slider.innerHTML += `
      <article id="${allPosts[i].id}">
        <h2>${postTitle}</h2>
        <figure class="figure-general"><img src="${featuredImg}" alt="${altText}"/></figure>
        <a href="/html/post.html?key=${allPosts[i].id}" class="continue-btn">continue reading...</a>
      </article>`;

      if (i === 5) {
        break;
      }
    }
    openPostOnClick();

    //scroll eventlisteners
    prev.addEventListener("click", () => {
      slider.scrollLeft -= itemWidth + padding;
    });
    next.addEventListener("click", () => {
      slider.scrollLeft += itemWidth + padding;
    });
    linkToMore = `/html/archive.html?key=newly-published&id=18`;
    showMoreBtn(newlyPublishedSection, linkToMore);
  } catch (error) {
    console.log(error);
    generalErrorMessage(error);
  }
}
renderNewlyPublishedPosts();

//render posts for "most popular posts"
async function renderPopularPostsTag11() {
  try {
    const allPosts = await fetchAllBlogPosts();
    loader2.innerHTML = "";

    //filter out the right tag
    const postsByTag = allPosts.filter((posts) => {
      if (posts.tags[0] === 11) {
        return posts;
      }
    });

    for (let i = 0; i < postsByTag.length; i++) {
      renderPostContent(postsByTag[i]);
      popularPostsWrapper.innerHTML += `
        <article id="${postsByTag[i].id}">
          <h2>${postTitle}</h2>
          ${excerpt}
          <a href="/html/post.html?key=${postsByTag[i].id}">continue reading...</a>
          <figure class="figure-general"><img src="${featuredImg}" alt="${altText}"/></figure>
        </article>`;
      if (i === 4) {
        break;
      }
    }
    openPostOnClick();
    linkToMore = `/html/archive.html?tag=11`;
    showMoreBtn(popularPostsSection, linkToMore);
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
}
renderPopularPostsTag11();

async function fetchPages() {
  try {
    const response = await fetch(`${url}pages`);
    loader3.innerHTML = "";

    if (response.ok) {
      const pages = await response.json();
      aboutUsWrapper.innerHTML += `
      <figure class="figure-general">
        <img src="/img/placeholder-2.jpg" />
      </figure>
      <div class="about-us-info">
        ${pages[1].content.rendered}
        <a href="/html/about.html">more about us</a>
      </div>`;
    }
    if (!response.ok) {
      throw new Error("Error when executing fetchPages About Section - fetching API");
    }
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
}
fetchPages();
