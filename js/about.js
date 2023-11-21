import { showLoadingIndicator, showMoreBtn } from "./global.js";
import { fetchAllBlogPosts, fetchAllPages, fetchSpesificImages } from "./api-call.js";
import { generalErrorMessage } from "./error-handling.js";

//this variable is only outside of the function because in case your want a loadingindicator on the next function aswell
const loader = document.querySelector(".loader");

//render our vision section
async function renderOurVisionSection() {
  try {
    showLoadingIndicator(loader);

    //fetch all pages
    const allPages = await fetchAllPages();

    loader.innerHTML = "";

    const title = allPages[1].title.rendered;
    const copy = allPages[1].content.rendered;

    //  format and render linked img
    const imageApi = allPages[1]._links["wp:featuredmedia"]["0"].href;
    const img = await fetchSpesificImages(imageApi);
    const featuredImg = img.source_url;
    const altText = img.alt_text;
    const caption = img.caption.rendered;

    const aboutUs = document.querySelector(".about-section");
    aboutUs.innerHTML += `
    <article class="our-vision">
      <figure class="our-vision-img">
          <img src="${featuredImg}" alt="${altText}" />
          <figcaption>${caption}</figcaption>
      </figure>
      <div>
        <h2>${title}</h2>
        <p>${copy}</p>
        <div class="icons">
          <figure><i class="fa-solid fa-screwdriver-wrench"></i></figure>
          <figure><i class="fa-solid fa-route"></i></figure>
          <figure><i class="fa-solid fa-house"></i></figure>
          <figure><i class="fa-solid fa-comments"></i></figure>
        </div>
      </div>
    </article>`;
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
}
renderOurVisionSection();

//render our team section
async function renderOurTeamSection() {
  try {
    //having a loading indicator here is a bit wierd
    // showLoadingIndicator(loader);

    //fetch all pages
    const allPages = await fetchAllPages();

    // loader.innerHTML = "";

    const title = allPages[2].title.rendered;
    const copy = allPages[2].content.rendered;

    //  format and render linked img
    const imageApi = allPages[2]._links["wp:featuredmedia"]["0"].href;
    const img = await fetchSpesificImages(imageApi);
    const featuredImg = img.source_url;
    const altText = img.alt_text;

    const aboutUs = document.querySelector(".about-section");
    aboutUs.innerHTML += `
    <article class="the-team">
      <div>
        <h2>${title}</h2>
        <p>${copy}</p>
      </div>
      <figure class="the-team-img">
        <img src="${featuredImg}" alt="${altText}" />
        <figcaption>caption: ${altText}</figcaption>
      </figure>
    </article>`;
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
}
renderOurTeamSection();

//DU ER HER --- JOBBER MED DET NEDENFOR:

const loader2 = document.querySelector(".loader-related-posts");
const relatedPostsSection = document.querySelector(".related-posts-section");
showLoadingIndicator(loader2);

async function renderOurStories() {
  try {
    const allPosts = await fetchAllBlogPosts();

    loader2.innerHTML = "";

    //filter out the right tag
    const postsByTag = allPosts.filter((posts) => {
      if (posts.tags[0] === 17) {
        return posts;
      }
    });

    let linkToMore;

    for (let i = 0; i < postsByTag.length; i++) {
      const postTitle = postsByTag[i].title.rendered;
      const excerpt = postsByTag[i].excerpt.rendered;

      const relatedPosts = document.querySelector(".related-posts");

      relatedPosts.innerHTML += `
        <article>
          <h2>${postTitle}</h2>
          ${excerpt}
          <a href="/html/post.html?key=${postsByTag[i].id}">continue reading...</a>
        </article>`;

      linkToMore = `/html/list.html?key=${postsByTag[i].categories[0]}`;

      if (i === 2) {
        break;
      }
    }

    const currentTag = postsByTag[0].tags[0];
    linkToMore = `/html/archive.html?tag=${currentTag}`;
    showMoreBtn(relatedPostsSection, linkToMore);
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
}
renderOurStories();
