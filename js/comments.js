
//render comments function
export function renderComments(comments, div) {
  if (comments.length === 0) {
    // console.log("no comments");
    div.innerHTML += `<div>no comments</div>`;
  } else {
    for (let i = 0; i < comments.length; i++) {
      // console.log("theres comments:", comments[i]);
      div.innerHTML += `
      <div class="comment">
        <h4>${comments[i].author_name}</h4>
        <p class="meta-data">date and time</p>
        <p class="comment-content">${comments[i].content.rendered}</p>
      </div>`;
    }
  }
}

// function addComment() {
//   const postId = getPostIdFromURL();
//   const commentAuthor = document.getElementById("comment-author").value;
//   const commentContent = document.getElementById("comment-content").value;
//   const commentData = {
//     post: postId,
//     author_name: commentAuthor,
//     content: commentContent,
//   };
//   const apiUrl = `${API_URL}/comments?post=${postId}}`;
//   const options = {
//     method: "POST",
//     body: JSON.stringify(commentData),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   fetch(apiUrl, options)
//     .then(response => response.json())
//     .then(data => {
//       location.reload();
//     })
//     .catch(error => console.log(error));
// }

// submitButton.addEventListener("click", (e) => {
//   e.preventDefault();
//   addComment();
// });