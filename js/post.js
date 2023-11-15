import { fetchPostById, fetchSpesificImages, fetchComments } from "./api-call.js";
import { formatDate, renderComments } from "./global.js";

//render blog-post
async function renderBlogPost() {
  //fetch blogpost
  const blogPost = await fetchPostById();

  //fetch comments
  const commentsUrl = blogPost._links.replies["0"].href;
  const allComments = await fetchComments(commentsUrl);

  console.log(commentsUrl);

  //fetch and format publishdate
  const date = formatDate(blogPost.date);

  //render content
  const title = blogPost.title.rendered;
  const copy = blogPost.content.rendered;

  //format and render linked img
  const imageApi = blogPost._links["wp:featuredmedia"]["0"].href;
  const img = await fetchSpesificImages(imageApi);
  const featuredImg = img.source_url;
  const altText = img.alt_text;

  //add post HTML
  const displayPost = document.querySelector(".blogpost-section");
  displayPost.innerHTML += `
  <div class="post-title">
    <h1>${title}</h1>
  </div>
  <div class="post-body">
    <section class="post-info-section">
      <div class="filter-data">
        <div>sub-category: abc</div>
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
      <figure>
        <img src="${featuredImg}" alt="${altText}" />
        <figcaption>caption</figcaption>
      </figure>
    </section>
    <section class="post-copy-section">${copy}</section>
    <section class="comment-section">
      <button class="view-more-comments-CTA">${allComments.length} comments <i class="fa-solid fa-chevron-down"></i></button>
    </section>
    </div>`;

  //add active/open comment-section
  const commentSection = document.querySelector(".comment-section");
  const commentsDiv = document.createElement("div");
  commentsDiv.classList.add("open-comment-section");

  //render comments
  renderComments(allComments, commentsDiv);
  commentSection.appendChild(commentsDiv);

  //add new-comment-form
  const addNewCommentsForm = document.createElement("form");
  addNewCommentsForm.classList.add("formelement");
  addNewCommentsForm.innerHTML += `
  <h4>Write us a comment</h4>
  <form class="comment-form">
    <label for="author">Author</label>
    <input class="new-comment-field" type="text" name="author" id="author" placeholder="Name" required>
    <label for="author">Comment</label>
    <textarea class="new-comment-field" name="comment" id="comment" placeholder="Type comment here..." required></textarea>
  </form>
  <input type="button" value="post comment" class="send-CTA">`;
  commentSection.appendChild(addNewCommentsForm);

  //open/close the comment section
  const commentSectionBtn = document.querySelector(".view-more-comments-CTA");
  const commentBtnArrow = document.querySelector(".fa-chevron-down");

  commentSectionBtn.addEventListener("click", () => {
    // console.log("open comment section");
    commentSection.classList.toggle("active");
    commentBtnArrow.classList.toggle("active");
    commentsDiv.classList.toggle("active");
    addNewCommentsForm.classList.toggle("active");
  });

  function addComment() {
    const postId = blogPost.id;
    const commentAuthor = document.querySelector("#author").value;
    const commentContent = document.querySelector("#comment").value;

    const commentObj = {
      post: postId,
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
        console.log(data);
        // location.reload();
      });
  }
  const sendBtn = document.querySelector(".send-CTA");
  sendBtn.addEventListener("click", () => {
    addComment();
  });
}
renderBlogPost();
