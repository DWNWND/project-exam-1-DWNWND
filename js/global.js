import { generalErrorMessage } from "./error-handling.js";

//show-more-button
export function showMoreBtn(htmlElement, link) {
  try {
    const moreBtn = document.createElement("a");
    moreBtn.setAttribute("href", link);
    moreBtn.classList.add("more-btn");
    moreBtn.innerText = "click here for more similar posts";
    htmlElement.appendChild(moreBtn);
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
}

//open posts eventlistner
export function openPostOnClick() {
  const allArticles = document.querySelectorAll("article");
  allArticles.forEach(function (article) {
    article.addEventListener("click", () => {
      window.location.href = `/html/post.html?key=${article.id}`;
    });
  });
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
    console.log(error);
  }
}