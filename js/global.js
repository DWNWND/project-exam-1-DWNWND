import { fetchAllBlogPosts } from "./api-call.js";
import { generalErrorMessage } from "./error-handling.js";

//show-more-button
export function showMoreBtn(htmlElement, link) {
  try {
    const moreBtn = document.createElement("a");
    moreBtn.setAttribute("href", link);
    moreBtn.classList.add("more-btn");
    moreBtn.innerText = "click for more";
    htmlElement.appendChild(moreBtn);
  } catch (error) {
    generalErrorMessage(error);
  }
}

// loading-indicator
export function showLoadingIndicator(section) {
  section.innerText += "LOADING...";
}

//formatting publishdate
export function formatDate(rawDate) {
  try {
    const initialWpPublishedDate = rawDate;
    const formattableDate = new Date(initialWpPublishedDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const dateArr = formattableDate.split(",");
    return dateArr;
  } catch (error) {
    generalErrorMessage(error);
  }
}

//render comments
export function renderComments(comments, div) {
  try {
    if (comments.length === 0) {
      div.innerHTML += `<div class="no-comments">no comments yet</div>`;
    } else {
      for (let i = 0; i < comments.length; i++) {
        //fetch and format date
        const date = formatDate(comments[i].date);

        div.innerHTML += `
      <div class="comment">
        <h4>${comments[i].author_name}</h4>
        <p class="meta-data">${date[0]}, ${date[1]}</p>
        <p class="comment-content">${comments[i].content.rendered}</p>
      </div>`;
      }
    }
  } catch (error) {
    generalErrorMessage(error);
  }
}

//render related posts-section(this function does not fetch related posts (yet)- for the about page and blog spesific page)
export async function renderRelatedPosts() {
  try {
    const loader = document.querySelector(".loader-related-posts");
    showLoadingIndicator(loader);

    //fetch blogpost
    const allPosts = await fetchAllBlogPosts();

    loader.innerHTML = "";

    for (let i = 0; i < allPosts.length; i++) {
      if (allPosts[i].tags[0] === 11) {
        const postTitle = allPosts[i].title.rendered;
        const excerpt = allPosts[i].excerpt.rendered;

        const relatedPosts = document.querySelector(".related-posts");

        relatedPosts.innerHTML += `
        <article>
          <h2>${postTitle}</h2>
          ${excerpt}
          <a href="/html/post.html?key=${allPosts[i].id}">continue reading...</a>
        </article>`;

        if (i === 2) {
          break;
        }
      }
    }
  } catch (error) {
    generalErrorMessage(error);
  }
}
