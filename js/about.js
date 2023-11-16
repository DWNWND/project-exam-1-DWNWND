import { renderRelatedPosts } from "./global.js";
import { fetchAllPages, fetchSpesificImages } from "./api-call.js";

//render our vision section
async function renderOurVisionSection() {
  const allPages = await fetchAllPages();

  const title = allPages[1].title.rendered;
  const copy = allPages[1].content.rendered;

  //  format and render linked img
  const imageApi = allPages[1]._links["wp:featuredmedia"]["0"].href;
  const img = await fetchSpesificImages(imageApi);
  const featuredImg = img.source_url;
  const altText = img.alt_text;

  console.log(allPages[1]);

  const aboutUs = document.querySelector(".about-section");
  aboutUs.innerHTML += `
    <article class="our-vision">
      <figure class="our-vision-img">
          <img src="${featuredImg}" alt="${altText}" />
          <figcaption>caption: ${altText}</figcaption>
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
}
renderOurVisionSection();

//render our team section
async function renderOurTeamSection() {
  const allPages = await fetchAllPages();

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
}
renderOurTeamSection();

renderRelatedPosts();
