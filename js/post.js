import { fetchPostById, fetchSpesificImages, fetchComments, fetchAllCategories, url } from "./api-call.js";
import { formatDate, showLoadingIndicator, showMoreBtn, openPostOnClick } from "./global.js";
import { generalErrorMessage } from "./error-handling.js";

const metaTitle = document.querySelector("#title");
const metaDescription = document.querySelector("#meta-description");
const displayPost = document.querySelector(".blogpost-section");
const relatedPostsSection = document.querySelector(".related-posts-section");
const relatedPosts = document.querySelector(".related-posts");
const pathDirectory = document.querySelector(".directory");

const loader1 = document.querySelector(".loader-posts");
const loader2 = document.querySelector(".loader-related-posts");

showLoadingIndicator(loader1);
showLoadingIndicator(loader2);

let firstCategory;
let categoryName;
let postTitle;
let linkToMore;

//render blog-post
async function renderBlogPost() {
  try {
    const blogPost = await fetchPostById();
    loader1.innerHTML = "";

    postTitle = blogPost.title.rendered;
    const postCategories = blogPost.categories;

    const postCategoryFilter = postCategories.filter((cat) => {
      if (cat !== 19 && cat !== 18) {
        return cat;
      }
    });

    firstCategory = postCategoryFilter[0];

    metaTitle.textContent = postTitle;
    metaDescription.setAttribute("content", blogPost.excerpt.rendered);

    //fetch and format publishdate
    const date = formatDate(blogPost.date);

    //format and render linked img
    const imageApi = blogPost._links["wp:featuredmedia"]["0"].href;
    const img = await fetchSpesificImages(imageApi);

    //fetch comments
    const commentsUrl = blogPost._links.replies["0"].href;
    const allComments = await fetchComments(commentsUrl);

    displayPost.innerHTML += `
    <div class="post-title-wrapper">
      <h1 class="post-title">${postTitle}</h1>
    </div>
    <div class="post-body">
      <section class="post-info-section">
        <div class="filter-data">
          <div class="sub-category">abc</div>
          <div>tags: abc</div>
        </div>
        <div class="share-CTA">
          <a href="#">share this post</a>
        </div>
        <div class="meta-data">
          <div class="date">Last updated: </div>
          <div>${date[0]}, ${date[1]}</div>
          <div class="author">author: xxx </div>
        </div>
      </section>
      <section class="post-img-section">
        <figure class="post-img-wrapper" >
          <img src="${img.source_url}" alt="${img.alt_text}" class="post-img" />
          <figcaption>${img.caption.rendered}</figcaption>
        </figure>
      </section>
      <section class="post-copy-section">${blogPost.content.rendered}</section>
      <section class="comment-section">
        <button class="view-more-comments-CTA">${allComments.length} comments <i class="fa-solid fa-chevron-down"></i></button>
      </section>
      </div>`;

    const image = document.querySelectorAll(".post-img");
    image.forEach(function (img) {
      img.addEventListener("click", (event) => {
        const imgSrc = event.target.src;
        const imgAlt = event.target.alt;
        addImgModal(imgSrc, imgAlt);

        //fetch dialoge and open it as modal
        const newModal = document.querySelector(".img-modal");
        newModal.showModal();
      });
    });

    //add active/open comment-section
    const commentSection = document.querySelector(".comment-section");
    const commentsDiv = document.createElement("div");
    commentSection.appendChild(commentsDiv);
    commentsDiv.classList.add("open-comment-section");

    //render comments
    function renderComments(comments, div) {
      try {
        if (comments.length === 0) {
          div.innerHTML += `<div class="no-comments">no comments yet</div>`;
        } else {
          for (let i = 0; i < comments.length; i++) {
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
    renderComments(allComments, commentsDiv);

    //add new-comment-form
    const addNewCommentsForm = document.createElement("form");
    addNewCommentsForm.classList.add("formelement");
    addNewCommentsForm.innerHTML += `
      <h2 class="heading-comments">Write us a comment</h2>
      <form class="comment-form">
        <label for="author">Author</label>
        <input name="author" id="author" class="new-comment-field" type="text" placeholder="Name" required>
        <label for="email">Email</label>
        <input name="email" id="email" class="new-comment-field" type="email" placeholder="Email" required>
        <label for="comment">Comment</label>
        <textarea  name="comment" id="comment" class="new-comment-field" placeholder="Type comment here..." required></textarea>
      </form>
      <input type="button" value="post comment" class="send-CTA">`;
    commentSection.appendChild(addNewCommentsForm);

    //open/close the comment section
    const commentSectionBtn = document.querySelector(".view-more-comments-CTA");
    const commentBtnArrow = document.querySelector(".fa-chevron-down");

    commentSectionBtn.addEventListener("click", () => {
      commentSection.classList.toggle("active");
      commentBtnArrow.classList.toggle("active");
      commentsDiv.classList.toggle("active");
      addNewCommentsForm.classList.toggle("active");
    });

    const errorWhenSending = document.createElement("div");
    errorWhenSending.classList.add("comment-login-error");
    addNewCommentsForm.appendChild(errorWhenSending);

    //send new comment - POST to REST API - i did not manage to get this working, don't want to remove it so that i can continue trying later.
    function addComment() {
      const postId = blogPost.id;
      const commentAuthor = document.querySelector("#author").value;
      const commentEmail = document.querySelector("#email").value;
      const commentContent = document.querySelector("#comment").value;
      const commentObj = {
        post: postId,
        author_email: commentEmail,
        author_name: commentAuthor,
        content: commentContent,
      };
      const postComment = {
        method: "POST",
        body: JSON.stringify(commentObj),
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch(commentsUrl, postComment)
        .then((response) => response.json())
        .then((data) => {
          if (data.data.status === 401 || data.data.status === 400) {
            errorWhenSending.innerText = `Sorry, the comment function is not working right now. We are working on the issue.`;
            console.log("Error when trying to submit a comment: ", data.message);
          }
        });
    }
    const sendBtn = document.querySelector(".send-CTA");
    sendBtn.addEventListener("click", () => {
      addComment();
    });
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
}
renderBlogPost();

async function renderRelatedPosts() {
  try {
    const allCategories = await fetchAllCategories();
    const postsByCategory = await fetch(`${url}posts?categories=${firstCategory}`);
    loader2.innerHTML = "";

    const category = allCategories.filter((cat) => {
      if (cat.id === firstCategory) {
        return cat;
      }
    });
    categoryName = category[0].name;

    if (postsByCategory.ok) {
      const posts = await postsByCategory.json();

      for (let i = 0; i < posts.length; i++) {
        relatedPosts.innerHTML += `
          <article id="${posts[i].id}">
            <h2>${posts[i].title.rendered}</h2>
            ${posts[i].excerpt.rendered}
            <a href="/html/post.html?key=${posts[i].id}">continue reading...</a>
          </article>`;
        if (i === 2) {
          break;
        }
      }
      openPostOnClick();
    } else if (!postsByCategory.ok) {
      throw new Error("Something went wrong when fetching the related posts");
    }
    linkToMore = `/html/archive.html?key=${category[0].slug}&id=${category[0].id}`;
    pathDirectory.innerHTML = ` <a href="/./index.html">Home</a> > <a href="/html/archive.html?key=archive&id=19">Archive</a> > <a href="${linkToMore}">Category: ${categoryName}</a> > <a href="#">${postTitle}</a>`;
    showMoreBtn(relatedPostsSection, linkToMore);
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
}
renderRelatedPosts();

//img-modal
function addImgModal(src, alt) {
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
  bigImage.setAttribute("alt", alt);
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
