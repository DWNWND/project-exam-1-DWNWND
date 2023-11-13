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
import { fetchAllBlogPosts } from "./api-call.js";

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
      <a href="#" class="continue-btn">continue reading...</a>
    </article>`;
    //add alt-text in WP and link to the blogspeficis here

    if (i === 5) {
      break;
    }
  }
}
renderNewlyPublishedPosts();

// console.log(window.onresize)
