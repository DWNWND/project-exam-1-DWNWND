import { fetchPostsByCategory, fetchSpesificImages, fetchCategory } from "./api-call.js";
import { formatDate, showLoadingIndicator } from "./global.js";

//render category name/pagetitle
async function renderCategoryName() {
  const currentCategory = await fetchCategory();
  const pageTitle = document.querySelector(".pagetitle");
  pageTitle.innerHTML += `${currentCategory.name}`;
}
renderCategoryName();

//render filepath.....

const listView = document.querySelector(".archive-result-section");

//render categorizes posts
async function renderCategoriezedPosts() {
  showLoadingIndicator(listView);

  //fetch categorized posts
  const allCategorizedPosts = await fetchPostsByCategory();

  listView.innerHTML = `
  <div class="grid-display categorized-posts"></div>
  <a href="#" class="more-btn">load more posts</a>`;

  //fix the more-btn so tat is renders last + so that it only renders if theres more posts

  for (let i = 0; i < allCategorizedPosts.length; i++) {
    //render content
    const postTitle = allCategorizedPosts[i].title.rendered;
    const excerpt = allCategorizedPosts[i].excerpt.rendered;

    //fetch and format publishdate
    const date = formatDate(allCategorizedPosts[i].date);

    //format and render linked img
    const imageApi = allCategorizedPosts[i]._links["wp:featuredmedia"]["0"].href;
    const img = await fetchSpesificImages(imageApi);
    const featuredImg = img.source_url;
    const altText = img.alt_text;

    const displayCategorizedPosts = document.querySelector(".categorized-posts");

    //add post-articles HTML
    displayCategorizedPosts.innerHTML += `
    <article>
      <h2>${postTitle}</h2>
      <p>${excerpt}</p>
      <figure class="figure-general"><img src="${featuredImg}" alt="${altText}" /></figure>
      <div class="post-info">
        <div class="publish-date"><date>${date[0]}, ${date[1]}</date></div>
        <a href="/html/post.html?key=${allCategorizedPosts[i].id}" class="continue-btn">continue reading...</a>
      </div>
    </article>
    `;
  }
}
renderCategoriezedPosts();
