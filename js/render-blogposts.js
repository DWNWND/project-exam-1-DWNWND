//render posts for "most popular topics"
import { fetchAllBlogPosts } from "./api-call.js";

async function renderBlogPosts() {
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
        <a href="#">continue reading...</a>
        <figure><img src="${featuredImg}" alt="${altText}"/></figure>
      </article>`;
    }

    if (i === 4) {
      break;
    }
  }
}
renderBlogPosts();
