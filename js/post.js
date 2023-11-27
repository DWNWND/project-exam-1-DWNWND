import { fetchPostById, fetchSpesificImages, fetchComments, fetchAllCategories, url } from "./api-call.js";
import { formatDate, renderComments, showLoadingIndicator, addImgModal, showMoreBtn, openPostOnClick } from "./global.js";
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

//see if you can make this code more readable/clean it up
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

    // console.log(blogPost);
    // console.log(commentsUrl);

    displayPost.innerHTML += `
    <div class="post-title">
      <h1>${postTitle}</h1>
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
          <div class="date">updated: ${date[0]}, ${date[1]}</div>
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

        //add dialog to DOM and add the fetched img src to the dialog
        addImgModal(imgSrc);

        //fetch dialoge and open it as modal
        const newModal = document.querySelector(".img-modal");
        newModal.showModal();
      });
    });

    //add active/open comment-section
    const commentSection = document.querySelector(".comment-section");
    const commentsDiv = document.createElement("div");
    commentsDiv.classList.add("open-comment-section");

    //render comments
    renderComments(allComments, commentsDiv);
    commentSection.appendChild(commentsDiv);

    //add new-comment-form
    // fix this submitbutton thing before delivering (here an in the contactpage)
    const addNewCommentsForm = document.createElement("form");
    addNewCommentsForm.classList.add("formelement");
    addNewCommentsForm.innerHTML += `
      <h4>Write us a comment</h4>
      <form class="comment-form">
        <label for="author">Author</label>
        <input class="new-comment-field" type="text" name="author" id="author" placeholder="Name" required>
        <label for="email">Email</label>
        <input class="new-comment-field" type="email" name="email" id="email" placeholder="Email" required>
        <label for="author">Comment</label>
        <textarea class="new-comment-field" name="comment" id="comment" placeholder="Type comment here..." required></textarea>
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

    //This function does not yet work
    //send new comment - POST to REST API
    function addComment() {
      const postId = blogPost.id;
      const commentAuthor = document.querySelector("#author").value;
      const commentEmail = document.querySelector("#email").value;
      const commentContent = document.querySelector("#comment").value;
      const commentObj = {
        post: postId,
        email: commentEmail,
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
      // FIX THIS IF YOU HAVE TIME/
      fetch(commentsUrl, postComment)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data.status);

          if (data.data.status === 401) {
            const errorWhenSending = document.createElement("div");
            errorWhenSending.classList.add("comment-login-error");
            errorWhenSending.innerHTML += "Sorry, you must be logged in to post comments";
            addNewCommentsForm.appendChild(errorWhenSending);
          }
          // location.reload();
        });
    }
    const sendBtn = document.querySelector(".send-CTA");
    sendBtn.addEventListener("click", () => {
      // console.log("this function is now working yet");
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
