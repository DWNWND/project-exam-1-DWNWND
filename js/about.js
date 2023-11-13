//render posts for "most popular topics"
import { fetchAllPages } from "./api-call.js";

async function renderAboutSectionIndex() {
  const allPages = await fetchAllPages();

  const copy = allPages[1].content.rendered;
  const aboutUs = document.querySelector(".about-us");

  aboutUs.innerHTML += `
      <figure><img src="/img/placeholder-2.jpg" /></figure>
      <article>
        ${copy}
        <a href="#">more about us</a>
      </article>`;
}
renderAboutSectionIndex();
