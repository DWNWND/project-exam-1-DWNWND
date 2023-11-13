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
