import { fetchPostById, fetchSpesificImages, fetchComments } from "./api-call.js";
import { renderComments } from "./comments.js";
import { formatDate } from "./global.js";

//render blog-post
async function renderBlogPost() {
  const blogPost = await fetchPostById();

  //render content
  const title = blogPost.title.rendered;
  const copy = blogPost.content.rendered;

  //fetch and format date
  const date = formatDate(blogPost.date);

  //formatting the linked imageurl
  const imageApi = blogPost._links["wp:featuredmedia"]["0"].href;
  const img = await fetchSpesificImages(imageApi);
  const featuredImg = img.source_url;
  const altText = img.alt_text;

  //fetch comments - WORKING ON COMMENT SECTION RN
  const commentsUrl = blogPost._links.replies["0"].href;
  const allComments = await fetchComments(commentsUrl);

  //post HTML
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

  //generate the active/open comment-section
  const commentSection = document.querySelector(".comment-section");
  const commentsDiv = document.createElement("div");
  commentsDiv.classList.add("open-comment-section");

  //add comments
  renderComments(allComments, commentsDiv);
  commentSection.appendChild(commentsDiv);

  // add comment-form
  const addNewCommentsForm = document.createElement("form");
  addNewCommentsForm.classList.add("formelement");
  addNewCommentsForm.innerHTML += `
  <h4>Write us a comment</h3>
  <fieldset>
    <label for="author">abc</label>
    <input type="text" name="author" id="author" placeholder="x" required>
    <label for="author">abc</label>
    <textarea name="comment" id="comment" placeholder="Type comment here..." required></textarea>
  </fieldset>
  <input type="submit" value="send">`;
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
}
renderBlogPost();
