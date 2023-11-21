import { fetchAllBlogPosts, fetchAllPages } from "./api-call.js";
import { showLoadingIndicator, showMoreBtn } from "./global.js";
import { generalErrorMessage } from "./error-handling.js";

let postTitle;
let featuredImg;
let altText;
let excerpt;
let linkToMore;

//check and render post content
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

const loader1 = document.querySelector(".loader-1");
const loader2 = document.querySelector(".loader-2");
const loader3 = document.querySelector(".loader-3");

showLoadingIndicator(loader1);
showLoadingIndicator(loader2);
showLoadingIndicator(loader3);

//render newly published blogposts to slider
async function renderNewlyPublishedPosts() {
  try {
    const allPosts = await fetchAllBlogPosts();
    loader1.innerHTML = "";

    for (let i = 0; i < allPosts.length; i++) {
      renderPostContent(allPosts[i]);

      slider.innerHTML += `
      <article>
        <h2>${postTitle}</h2>
        <figure class="figure-general"><img src="${featuredImg}" alt="${altText}"/></figure>
        <a href="/html/post.html?key=${allPosts[i].id}" class="continue-btn">continue reading...</a>
      </article>`;

      //THIS LINK DIRECTS TO THE CATEGORY OF THE LAST POST RIGHT NOW.
      //DIRECTING TO THE TAG OF THE POSTS IS MORE DIFFICULT - SAME ON THE OTHER
      linkToMore = `/html/archive.html?key=${allPosts[i].categories[0]}`;

      if (i === 5) {
        break;
      }
    }

    //scroll eventlisteners
    prev.addEventListener("click", () => {
      slider.scrollLeft -= itemWidth + padding;
    });

    next.addEventListener("click", () => {
      slider.scrollLeft += itemWidth + padding;
    });
    showMoreBtn(newlyPublishedSection, linkToMore);
  } catch (error) {
    console.log(error);
    generalErrorMessage(error);
  }
}
renderNewlyPublishedPosts();

//render posts for "most popular posts"
async function renderPopularPosts() {
  try {
    const allPosts = await fetchAllBlogPosts();
    loader2.innerHTML = "";

    //filter out the right tag
    const postsByTag = allPosts.filter((posts) => {
      if (posts.tags[0] === 11) {
        return posts;
      }
    });

    //display the filtered posts
    for (let i = 0; i < postsByTag.length; i++) {
      renderPostContent(postsByTag[i]);

      popularPostsWrapper.innerHTML += `
        <article>
          <h2>${postTitle}</h2>
          ${excerpt}
          <a href="/html/post.html?key=${postsByTag[i].id}">continue reading...</a>
          <figure class="figure-general"><img src="${featuredImg}" alt="${altText}"/></figure>
        </article>`;

      if (i === 4) {
        break;
      }
    }
    const currentTag = postsByTag[0].tags[0];
    linkToMore = `/html/archive.html?tag=${currentTag}`;
    showMoreBtn(popularPostsSection, linkToMore);
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
}
renderPopularPosts();

//render about us section
async function renderAboutSectionIndex() {
  try {
    const allPages = await fetchAllPages();
    loader3.innerHTML = "";

    const copy = allPages[1].content.rendered;
    aboutUsWrapper.innerHTML += `
      <figure class="figure-general">
        <img src="/img/placeholder-2.jpg" />
      </figure>
      <article>
        ${copy}
        <a href="/html/about.html">more about us</a>
      </article>`;
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
}
renderAboutSectionIndex();
