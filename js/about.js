import { showLoadingIndicator, showMoreBtn, openPostOnClick } from "./global.js";
import { fetchAllBlogPosts, fetchSpesificImages, url } from "./api-call.js";
import { generalErrorMessage } from "./error-handling.js";

const aboutUs = document.querySelector(".about-section");
const relatedPostsSection = document.querySelector(".related-posts-section");
const relatedPosts = document.querySelector(".related-posts");

const loader1 = document.querySelector(".loader-about-us");
const loader2 = document.querySelector(".loader-related-posts");
showLoadingIndicator(loader1);
showLoadingIndicator(loader2);

async function fetchPages() {
  try {
    const response = await fetch(`${url}pages`);
    loader1.innerHTML = "";

    if (response.ok) {
      const pages = await response.json();

      const ourVisionImageApi = pages[1]._links["wp:attachment"]["0"].href;
      const ourVisionImg = await fetchSpesificImages(ourVisionImageApi);
      const newAboutImage = "../img/chang-duong-Sj0iMtq_Z4w-unsplash.jpg"

      const theTeamImageApi = pages[2]._links["wp:attachment"]["0"].href;
      const theTeamImg = await fetchSpesificImages(theTeamImageApi);

      aboutUs.innerHTML += `
      <div class="our-vision">
        <figure class="our-vision-img">
            <img src="${newAboutImage}" alt="${ourVisionImg.alt_text}" />
        </figure>
        <div>
          <h1 class="heading-about-us-page">${pages[1].title.rendered}</h1>
          <p>${pages[1].content.rendered}</p>
          <div class="icons">
            <figure><i class="fa-solid fa-screwdriver-wrench"></i></figure>
            <figure><i class="fa-solid fa-route"></i></figure>
            <figure><i class="fa-solid fa-house"></i></figure>
            <figure><i class="fa-solid fa-comments"></i></figure>
          </div>
        </div>
      </div>`;

      // <figcaption>${ourVisionImg.caption.rendered}</figcaption>

      aboutUs.innerHTML += `
      <div class="the-team">
        <div>
          <h1 class="heading-about-us-page">${pages[2].title.rendered}</h1>
          <p>${pages[2].content.rendered}</p>
        </div>
        <figure class="the-team-img">
          <img src="${newAboutImage}" alt="${ourVisionImg.alt_text}" />
        </figure>
      </div>`;

      // <figcaption>${theTeamImg.caption.rendered}</figcaption>
    }
    if (!response.ok) {
      throw new Error("Error when executing fetchPages - fetching API");
    }
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
}
fetchPages();

async function renderOurStoriesTag17() {
  try {
    const allPosts = await fetchAllBlogPosts();
    loader2.innerHTML = "";

    const postsByTag = allPosts.filter((posts) => {
      if (posts.tags[0] === 17) {
        return posts;
      }
    });

    for (let i = 0; i < postsByTag.length; i++) {
      relatedPosts.innerHTML += `
        <article id="${postsByTag[i].id}">
          <h2>${postsByTag[i].title.rendered}</h2>
          ${postsByTag[i].excerpt.rendered}
          <a href="/html/post.html?key=${postsByTag[i].id}">continue reading...</a>
        </article>`;

      if (i === 2) {
        break;
      }
    }
    openPostOnClick();

    const linkToMore = `/html/archive.html?tag=17`;
    showMoreBtn(relatedPostsSection, linkToMore);
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
}
renderOurStoriesTag17();
