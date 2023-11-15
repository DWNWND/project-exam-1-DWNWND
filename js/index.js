import { fetchAllBlogPosts } from "./api-call.js";

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

//render newly published blogposts to slider
async function renderNewlyPublishedPosts() {
  const allPosts = await fetchAllBlogPosts();

  for (let i = 0; i < allPosts.length; i++) {
    const postTitle = allPosts[i].title.rendered;
    const featuredImg = allPosts[i]._embedded["wp:featuredmedia"]["0"].source_url;
    const altText = allPosts[i]._embedded["wp:featuredmedia"]["0"].alt_text;

    const slider = document.querySelector(".slider");

    slider.innerHTML += `
    <article>
      <h2>${postTitle}</h2>
      <figure><img src="${featuredImg}" alt="${altText}"/></figure>
      <a href="/html/post.html?key=${allPosts[i].id}" class="continue-btn">continue reading...</a>
    </article>`;
    //add alt-text in WP and link to the blogspeficis here

    if (i === 5) {
      break;
    }
  }
}
renderNewlyPublishedPosts();

//render posts for "most popular topics"
async function renderPopularPosts() {
  const allPosts = await fetchAllBlogPosts();

  for (let i = 0; i < allPosts.length; i++) {
    if (allPosts[i].tags[0] === 11) {
      const postTitle = allPosts[i].title.rendered;
      const featuredImg = allPosts[i]._embedded["wp:featuredmedia"]["0"].source_url;
      const altText = allPosts[i]._embedded["wp:featuredmedia"]["0"].alt_text;
      const excerpt = allPosts[i].excerpt.rendered;

      const popularTopics = document.querySelector(".popular-topics");

      popularTopics.innerHTML += `
      <article>
        <h2>${postTitle}</h2>
        <p>${excerpt}</p>
        <a href="/html/post.html?key=${allPosts[i].id}">continue reading...</a>
        <figure><img src="${featuredImg}" alt="${altText}"/></figure>
      </article>`;
    }

    if (i === 4) {
      break;
    }
  }
}
renderPopularPosts();

//render about us info/pages
import { fetchAllPages } from "./api-call.js";

async function renderAboutSectionIndex() {
  const allPages = await fetchAllPages();

  const copy = allPages[1].content.rendered;
  const aboutUs = document.querySelector(".about-us");
  //to get this to work on the about us page aswell, the sections needs to have the same class as on the index-page

  aboutUs.innerHTML += `
      <figure><img src="/img/placeholder-2.jpg" /></figure>
      <article>
        ${copy}
        <a href="#">more about us</a>
      </article>`;
}
renderAboutSectionIndex();
