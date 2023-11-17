import { fetchAllBlogPosts } from "./api-call.js";
import { showLoadingIndicator, showMoreBtn } from "./global.js";

//render newly published blogposts to slider
async function renderNewlyPublishedPosts() {
  const sliderView = document.querySelector(".slider-wrapper");
  showLoadingIndicator(sliderView);

  const allPosts = await fetchAllBlogPosts();

  sliderView.innerHTML = `
  <button id="prev-btn" class="prev-btn">
    <i class="fa-solid fa-chevron-left"></i>
  </button>
  <div class="grid-display slider"></div>
  <button id="next-btn" class="next-btn">
    <i class="fa-solid fa-chevron-right"></i>
  </button>`;

  for (let i = 0; i < allPosts.length; i++) {
    const postTitle = allPosts[i].title.rendered;
    const featuredImg = allPosts[i]._embedded["wp:featuredmedia"]["0"].source_url;
    const altText = allPosts[i]._embedded["wp:featuredmedia"]["0"].alt_text;

    const slider = document.querySelector(".slider");

    slider.innerHTML += `
    <article>
      <h2>${postTitle}</h2>
      <figure class="figure-general"><img src="${featuredImg}" alt="${altText}"/></figure>
      <a href="/html/post.html?key=${allPosts[i].id}" class="continue-btn">continue reading...</a>
    </article>`;
    //add alt-text in WP and link to the blogspeficis here

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
  showMoreBtn(newlyPublishedSection, "link");
}
renderNewlyPublishedPosts();

//render posts for "most popular topics"
async function renderPopularPosts() {
  const popularTopicsWrapper = document.querySelector(".popular-topics-wrapper");
  showLoadingIndicator(popularTopicsWrapper);

  const allPosts = await fetchAllBlogPosts();

  popularTopicsWrapper.innerHTML = `
  <div class="grid-display popular-topics"></div>`;

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
        <figure class="figure-general"><img src="${featuredImg}" alt="${altText}"/></figure>
      </article>`;
    }

    if (i === 4) {
      break;
    }
  }
  //add a link here to show more
  const popularTopicsSection = document.querySelector(".popular-topics-section");
  showMoreBtn(popularTopicsSection, "link");
}
renderPopularPosts();

//render about us info/pages
import { fetchAllPages } from "./api-call.js";

async function renderAboutSectionIndex() {
  const allPages = await fetchAllPages();

  const copy = allPages[1].content.rendered;
  const aboutUs = document.querySelector(".about-us");

  aboutUs.innerHTML += `
      <figure class="figure-general"><img src="/img/placeholder-2.jpg" /></figure>
      <article>
        ${copy}
        <a href="#">more about us</a>
      </article>`;
}
renderAboutSectionIndex();
