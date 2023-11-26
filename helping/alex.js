const articleContainer = document.querySelector(".article-container");
const uniqueTitle = document.getElementById("unique-title");
const modalContainer = document.querySelector(".image-modal");

// //fetching API from my domain, together with the specific recipe.
const url = "https://sem-exam-fall23.alex-skoglund.no/wp-json/wp/v2/posts/" + 88;

async function fetchRecipe() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const myRecipe = await response.json();
      // console.log(myRecipe)
      return myRecipe;
    } else if (!response.ok) {
      document.getElementById("loading").style.display = "none";
      throw new Error("failed to fetch recipe.");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// fetchRecipe;

let imgClicked;

async function renderRecipe() {
  try {
    const myRecipe = await fetchRecipe();

    if (myRecipe) {
      articleContainer.innerHTML += ` <h1>${myRecipe.title.rendered}</h1> ${myRecipe.content.rendered}`; //rendering full article with images and text from WP.
      uniqueTitle.innerHTML = `${myRecipe.title.rendered}`; // rendering unique title from API ID in HTML.
    }

    const grabTheRenderedImages = document.querySelectorAll("img");

    grabTheRenderedImages.forEach(function (img) {
      img.addEventListener("click", (event) => {
        imgClicked = event.target;
        console.log(imgClicked);
        makeModal(imgClicked.src);
      });
    });
  } catch (error) {
    console.log(error);
  }
}
renderRecipe();

function makeModal(src) {
  //  add dialog to DOM and add the img to the dialog
  const modal = document.createElement("dialog");
  modal.classList.add("img-modal");
  document.querySelector("main").append(modal);

  const bigImage = document.createElement("img");
  bigImage.setAttribute("src", src);
  modal.append(bigImage);

  modal.showModal();
}
