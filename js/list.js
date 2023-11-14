import { fetchPostsByCategory, fetchSpesificImages } from "./api-call.js";

// fetchPostsByCategory();

async function renderCategoriezedPosts() {
  const allCategorizedPosts = await fetchPostsByCategory();

  for (let i = 0; i < allCategorizedPosts.length; i++) {
    // console.log(allCategorizedPosts[i]);
    const postTitle = allCategorizedPosts[i].title.rendered;
    const excerpt = allCategorizedPosts[i].excerpt.rendered;

    const imageApi = allCategorizedPosts[i]._links["wp:featuredmedia"]["0"].href;
    const img = await fetchSpesificImages(imageApi);
    const featuredImg = img.source_url;
    const altText = img.alt_text;

    const displayCategorizedPosts = document.querySelector(".categorized-posts");

    displayCategorizedPosts.innerHTML += `
    <article>
      <h2>${postTitle}</h2>
      <p>${excerpt}</p>
      <figure><img src="${featuredImg}" alt="${altText}" /></figure>
      <div class="post-info">
        <div class="publish-date">published: <date>11.11.2023</date></div>
        <a href="#" class="continue-btn">continue reading...</a>
      </div>
    </article>
    `;
    //   if (i === 4) {
    //     break;
    //   }
    // }
  }
}
renderCategoriezedPosts();
