// import { fetchAllBlogPosts } from "./api-call.js";
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
    console.log(error);
  }
}

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
    console.log(error);
  }
}

//CLEAN UP THE IMAGE MODAL - CHECK HOW YOU DID FOR ALEX
//img-modal
export function addImgModal(src) {
  //modal-dialog-element
  const imgModal = document.createElement("dialog");
  imgModal.classList.add("img-modal", "modal");
  document.querySelector("main").append(imgModal);

  //modal-content
  const closeBtn = document.createElement("i");
  closeBtn.classList.add("fa-solid", "fa-xmark", "closeBtn");
  imgModal.append(closeBtn);

  const bigImage = document.createElement("img");
  bigImage.setAttribute("src", src);
  imgModal.append(bigImage);

  // close modal clicking X
  closeBtn.addEventListener("click", () => {
    imgModal.remove();
  });

  //close modal by clicking outside
  function onClick(event) {
    if (event.target === imgModal) {
      imgModal.remove();
    }
  }
  imgModal.addEventListener("click", onClick);
}
