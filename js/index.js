import { fetchAllBlogPosts, fetchAllPages } from "./api-call.js";
import { showLoadingIndicator, showMoreBtn } from "./global.js";
import { generalErrorMessage } from "./error-handling.js";

//render newly published blogposts to slider
async function renderNewlyPublishedPosts() {
  try {
    const loader = document.querySelector(".loader-1");
    showLoadingIndicator(loader);

    const allPosts = await fetchAllBlogPosts();

    loader.innerHTML = "";

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
  } catch (error) {
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
  } catch (error) {
    generalErrorMessage(error);
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
  }
}
renderAboutSectionIndex();
