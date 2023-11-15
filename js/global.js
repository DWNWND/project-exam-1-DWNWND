//formatting publishdate
export function formatDate(rawDate) {
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
}

//render comments
export function renderComments(comments, div) {
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
}
