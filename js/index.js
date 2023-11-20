import { fetchAllBlogPosts, fetchAllPages } from "./api-call.js";
import { showLoadingIndicator, showMoreBtn } from "./global.js";
import { generalErrorMessage } from "./error-handling.js";

let postTitle;
let featuredImg;
let altText;
let excerpt;
let linkToMore;

//check if the posts have a TITLE and console.log which post who lack one //check if the post has a featured img and console.log which post who lack one
function checkForPostTitle(post) {
  if (post.title.rendered) {
    postTitle = post.title.rendered;
  } else if (!post.title.rendered) {
    console.log("You need to add a title to this post: ", post);
  }
}

//check if the posts have a FEATURED IMG and console.log which post who lack one //check if the post has a featured img and console.log which post who lack one
function checkForFeaturedImg(post) {
  if (post._embedded["wp:featuredmedia"]) {
    featuredImg = post._embedded["wp:featuredmedia"]["0"].source_url;
    altText = post._embedded["wp:featuredmedia"]["0"].alt_text;
  } else if (!post._embedded["wp:featuredmedia"]) {
    console.log("You need to add a featured img to this post: ", post);
  }
}

//check if the posts have a EXCERPT and console.log which post who lack one //check if the post has a featured img and console.log which post who lack one
function checkForPostExcerpt(post) {
  if (post.excerpt.rendered) {
    excerpt = post.excerpt.rendered;
  } else if (!post.excerpt.rendered) {
    console.log("You need to add a excerpt/text-content to this post: ", post);
  }
}

//render newly published blogposts to slider
async function renderNewlyPublishedPosts() {
  try {
    const loader = document.querySelector(".loader-1");
    showLoadingIndicator(loader);

    const allPosts = await fetchAllBlogPosts();

    loader.innerHTML = "";

    for (let i = 0; i < allPosts.length; i++) {
      //render and check for content
      checkForPostTitle(allPosts[i]);
      checkForFeaturedImg(allPosts[i]);
      checkForPostExcerpt(allPosts[i]);

      const slider = document.querySelector(".slider");
      slider.innerHTML += `
    <article>
      <h2>${postTitle}</h2>
      <figure class="figure-general"><img src="${featuredImg}" alt="${altText}"/></figure>
      <a href="/html/post.html?key=${allPosts[i].id}" class="continue-btn">continue reading...</a>
    </article>`;
      //add alt-text in WP and link to the blogspeficis here

      //link to show more posts like this - THIS ONE DIRECTS TO THE CATEGORY OF THE LAST POST RIGHT NOW.
      //DIRECTING TO THE TAG OG THE POSTS IS MORE DIFFICULT - SAME ON THE OTHER
      linkToMore = `/html/list.html?key=${allPosts[i].categories[0]}`;
      console.log(linkToMore);

      if (i === 5) {
        break;
      }
    }
    // slider function
    const prev = document.querySelector(".prev-btn");
    const next = document.querySelector(".next-btn");
    const carouselSlider = document.querySelector(".slider");

    //how far the slider should scroll:
    const itemWidth = 250;
    const padding = 0;

    //scroll eventlisteners
    prev.addEventListener("click", () => {
      carouselSlider.scrollLeft -= itemWidth + padding;
    });

    next.addEventListener("click", () => {
      carouselSlider.scrollLeft += itemWidth + padding;
    });

    //add a link here to show more
    const newlyPublishedSection = document.querySelector(".newly-published-section");
    showMoreBtn(newlyPublishedSection, linkToMore);
  } catch (error) {
    console.log(error);
    generalErrorMessage(error);
  }
}
renderNewlyPublishedPosts();

//render posts for "most popular topics"
async function renderPopularPosts() {
  try {
    const loader = document.querySelector(".loader-2");
    showLoadingIndicator(loader);

    const allPosts = await fetchAllBlogPosts();

    loader.innerHTML = "";

    //filter out the right tag
    const postsByTag = allPosts.filter((posts) => {
      if (posts.tags[0] === 11) {
        return posts;
      }
    });

    //display the right/filtered posts
    for (let i = 0; i < postsByTag.length; i++) {
      //render and check for content
      checkForPostTitle(postsByTag[i]);
      checkForFeaturedImg(postsByTag[i]);
      checkForPostExcerpt(postsByTag[i]);

      //display posts
      const popularTopics = document.querySelector(".popular-topics");
      popularTopics.innerHTML += `
        <article>
          <h2>${postTitle}</h2>
          ${excerpt}
          <a href="/html/post.html?key=${postsByTag[i].id}">continue reading...</a>
          <figure class="figure-general"><img src="${featuredImg}" alt="${altText}"/></figure>
        </article>`;

      //link to show more posts like this - THIS ONE DIRECTS TO THE CATEGORY OF THE LAST POST RIGHT NOW.
      //DIRECTING TO THE TAG OG THE POSTS IS MORE DIFFICULT - SAME ON THE OTHER
      linkToMore = `/html/list.html?key=${postsByTag[i].categories[0]}`;
      console.log(linkToMore);

      if (i === 4) {
        break;
      }
    }
    const popularTopicsSection = document.querySelector(".popular-topics-section");
    showMoreBtn(popularTopicsSection, linkToMore);
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
}
renderPopularPosts();

//render about us info/pages
async function renderAboutSectionIndex() {
  try {
    const loader = document.querySelector(".loader-3");
    showLoadingIndicator(loader);

    const allPages = await fetchAllPages();

    loader.innerHTML = "";

    const aboutUs = document.querySelector(".about-us");
    const copy = allPages[1].content.rendered;
    aboutUs.innerHTML += `
      <figure class="figure-general">
      <img src="/img/placeholder-2.jpg" />
      </figure>
      <article>
        ${copy}
        <a href="#">more about us</a>
      </article>`;
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
}
renderAboutSectionIndex();
