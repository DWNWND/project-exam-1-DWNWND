import { fetchPostsByCategory, fetchSpesificImages, fetchCategory } from "./api-call.js";
import { formatDate, showLoadingIndicator, showMoreBtn } from "./global.js";
import { generalErrorMessage } from "./error-handling.js";

//render category pagetitle (meta and displayed)
async function renderCategoryName() {
  try {
    //(displayed)
    const currentCategory = await fetchCategory();
    const pageTitle = document.querySelector(".pagetitle");
    pageTitle.innerHTML += `${currentCategory.name}`;

    //(meta)
    const metaTitle = document.querySelector("#title");
    metaTitle.textContent = currentCategory.name;
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
}
renderCategoryName();

//REMEMBER TO render filepath.....

let postTitle;
let featuredImg;
let altText;
let excerpt;

//check if the posts have a TITLE and console.log which post who lack one //check if the post has a featured img and console.log which post who lack one
function checkForPostTitle(post) {
  if (post.title.rendered) {
    postTitle = post.title.rendered;
  } else if (!post.title.rendered) {
    console.log("You need to add a title to this post: ", post);
  }
}

//check if the posts have a EXCERPT and console.log which post who lack one //check if the post has a featured img and console.log which post who lack one
function checkForPostExcerpt(post) {
  if (post.excerpt.rendered) {
    excerpt = post.excerpt.rendered;
  } else if (!post.excerpt.rendered) {
    console.log("You need to add a excerpt/text-content to this post: ", post);
  }
}

//dont know if i just forgot to delete this or not:
// const listView = document.querySelector(".archive-result-section");

//render categorizes posts
async function renderCategoriezedPosts() {
  try {
    const loader = document.querySelector(".loader-list");
    showLoadingIndicator(loader);

    //fetch categorized posts
    const allCategorizedPosts = await fetchPostsByCategory();

    loader.innerHTML = "";

    //fix the more-btn so tat is renders last + so that it only renders if theres more posts

    for (let i = 0; i < allCategorizedPosts.length; i++) {
      //render content
      checkForPostTitle(allCategorizedPosts[i]);
      checkForPostExcerpt(allCategorizedPosts[i]);

      //check if the posts have a FEATURED IMG and console.log which post who lack one
      if (allCategorizedPosts[i]._links["wp:featuredmedia"]) {
        const imageApi = allCategorizedPosts[i]._links["wp:featuredmedia"]["0"].href;
        const img = await fetchSpesificImages(imageApi);
        featuredImg = img.source_url;
        altText = img.alt_text;
      } else if (!allCategorizedPosts[i]._links["wp:featuredmedia"]) {
        console.log("You need to add a featured img to this/these post(s): ", post);
      }

      //fetch and format publishdate
      const date = formatDate(allCategorizedPosts[i].date);

      const displayCategorizedPosts = document.querySelector(".categorized-posts");
      //add post-articles HTML
      displayCategorizedPosts.innerHTML += `
    <article>
      <h2>${postTitle}</h2>
      ${excerpt}
      <figure class="figure-general"><img src="${featuredImg}" alt="${altText}" /></figure>
      <div class="post-info">
        <div class="publish-date"><date>${date[0]}, ${date[1]}</date></div>
        <a href="/html/post.html?key=${allCategorizedPosts[i].id}" class="continue-btn">continue reading...</a>
      </div>
    </article>
    `;
      if (i === 10) {
        break;
      }
    }
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
}
renderCategoriezedPosts();

//ADD A LOAD-MORE BUTTON - NEEDS TO BE DONE BEFORE DELIVERY
const archiveResultSection = document.querySelector(".archive-result-section");
showMoreBtn(archiveResultSection, "#");
// const moreBtn = document.querySelector(".more-btn");
