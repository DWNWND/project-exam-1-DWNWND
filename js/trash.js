// const categorizedPosts = await fetchCategorzedPosts();

// loader.innerHTML = "";

//check if there is posts in this category
// if (categorizedPosts.length === 0) {
//   console.log("no posts in this category");
//   loader.innerHTML = "We don't have any posts in this category yet..";
//   loadMoreButton.classList.add("hidden");
// } else {
//   for (let i = 0; i < categorizedPosts.length; i++) {
//     //render and check content
//     renderPostContent(categorizedPosts[i]);

//     //check if the posts have a FEATURED IMG and console.log which post who lack one
//     if (categorizedPosts[i]._links["wp:featuredmedia"]) {
//       const imageApi = categorizedPosts[i]._links["wp:featuredmedia"]["0"].href;
//       const img = await fetchSpesificImages(imageApi);
//       featuredImg = img.source_url;
//       altText = img.alt_text;
//     } else if (!categorizedPosts[i]._links["wp:featuredmedia"]) {
//       console.log("You need to add a featured img to this/these post(s): ", post);
//     }

//     //fetch and format publishdate
//     const date = formatDate(categorizedPosts[i].date);

//     //add post-articles HTML
//     categorizedPostsWrapper.innerHTML += `
//     <article>
//       <h2>${postTitle}</h2>
//       ${excerpt}
//       <figure class="figure-general"><img src="${featuredImg}" alt="${altText}" /></figure>
//       <div class="post-info">
//         <div class="publish-date"><date>${date[0]}, ${date[1]}</date></div>
//         <a href="/html/post.html?key=${categorizedPosts[i].id}" class="continue-btn">continue reading...</a>
//       </div>
//     </article>`;
//   }
//   page++;
// }


  //TIDLIGERE VERSJON
    // const responseTag = await fetch(url + "tags/" + tag);
    // const responseSlug = await fetch(url + "categories?slug=" + key);

    // if (!key && responseTag.ok) {
    //   const currentTag = await responseTag.json();
    //   pageTitle.innerHTML += `${currentTag.name}`;
    //   metaTitle.textContent += " : " + currentTag.name;
    //   //ADD DISPLAY THE TAG-NAME ON THE PAGE
    // }
    // if (!tag && !responseTag.ok && responseSlug.ok) {
    //   const currentCategory = await responseSlug.json();
    //   pageTitle.innerHTML += `${currentCategory[0].name}`;
    //   metaTitle.textContent += " : " + currentCategory[0].name;

    // } else if (!responseTag.ok && !responseSlug.ok) {
    //   throw new Error("Something went wrong when fetching the category/tag");
    // }

    // async function renderCategoryName() {
//   try {
//     const response = await fetch(url + categoriesQueryString + "?slug=" + key);

//     if (response.ok) {
//     const currentCategory = await response.json();
//     //(title displayed on header)
//     // const currentCategory = results
//     const pageTitle = document.querySelector(".pagetitle");
//     pageTitle.innerHTML += `${currentCategory[0].name}`;

//     //(title in meta)
//     const metaTitle = document.querySelector("#title");
//     metaTitle.textContent += " : " + currentCategory[0].name;
//     }
//   } catch (error) {
//     generalErrorMessage(error);
//     console.log(error);
//   }
// }
// renderCategoryName();