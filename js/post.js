import { fetchPostById, fetchSpesificImages, fetchComments } from "./api-call.js";
import { formatDate } from "./global.js";

//render blog-post
async function renderBlogPost() {
  const blogPost = await fetchPostById();

  //render content
  const title = blogPost.title.rendered;
  const copy = blogPost.content.rendered;

  //fetch comments - NEXT FIX COMMENT SECTION
  const comments = await fetchComments(blogPost._links.replies["0"].href);
  for (let i = 0; i < comments.length; i++) {
    console.log(comments[i]);
  }

  //fetch and format date
  const date = formatDate(blogPost.date);

  //formatting the linked imageurl
  const imageApi = blogPost._links["wp:featuredmedia"]["0"].href;
  const img = await fetchSpesificImages(imageApi);
  const featuredImg = img.source_url;
  const altText = img.alt_text;

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
    <section class="post-comment-section">
      <button class="view-more-comments-CTA">x comments</button>
    </section>
    </div>`;
}
renderBlogPost();
