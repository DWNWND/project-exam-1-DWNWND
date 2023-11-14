import { fetchPostsByCategory, fetchSpesificImages, fetchCategory } from "./api-call.js";

//render category name/pagetitle
async function renderCategoryName() {
  const currentCategory = await fetchCategory();
  const pageTitle = document.querySelector(".pagetitle");
  pageTitle.innerHTML += `${currentCategory.name}`;
}
renderCategoryName();

//render filepath.....

//render categorizes posts
async function renderCategoriezedPosts() {
  const allCategorizedPosts = await fetchPostsByCategory();

  for (let i = 0; i < allCategorizedPosts.length; i++) {
    const postTitle = allCategorizedPosts[i].title.rendered;
    const excerpt = allCategorizedPosts[i].excerpt.rendered;

    //formatting the date that is displayed on each post
    const initialWpPublishedDate = allCategorizedPosts[i].date;
    const formattableDate = new Date(initialWpPublishedDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const dateArr = formattableDate.split(",");
    const displayedDate = dateArr[0];
    const displayedYearAndTime = dateArr[1];

    //formatting the linked imageurl for each post
    const imageApi = allCategorizedPosts[i]._links["wp:featuredmedia"]["0"].href;
    const img = await fetchSpesificImages(imageApi);
    const featuredImg = img.source_url;
    const altText = img.alt_text;

    //render article
    const displayCategorizedPosts = document.querySelector(".categorized-posts");
    displayCategorizedPosts.innerHTML += `
    <article>
      <h2>${postTitle}</h2>
      <p>${excerpt}</p>
      <figure><img src="${featuredImg}" alt="${altText}" /></figure>
      <div class="post-info">
        <div class="publish-date"><date>${displayedDate}, ${displayedYearAndTime}</date></div>
        <a href="/html/post.html${allCategorizedPosts[i].id}" class="continue-btn">continue reading...</a>
      </div>
    </article>
    `;
  }
}
renderCategoriezedPosts();
