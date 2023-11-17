// render header/navbar
const navModal = document.querySelector(".nav-modal");
navModal.innerHTML += `
<a href="#" class="hamburger-toggle closeBtn">
  <i class="fa-solid fa-xmark"></i>
</a>
<div class="logo-mobile">
  <a href="/index.html"><img src="/img/logo-black.png" /></a>
</div>
<div class="navbar-standard">
  <ul class="navbar-standard-alignment">
    <div class="standard-links">
      <li class="nav-item-stand"><a href="/html/index.html">Home</a></li>
      <li class="nav-item-stand"><a href="/html/about.html">About</a></li>
      <li class="nav-item-stand"><a href="/html/contact.html">Contact</a></li>
   </div>
   <li class="newsletter-signup"><a href="#">newsletter signup</a></li>
   <div class="icon-links">
      <li class="nav-icon-stand">
        <a href="#"><i class="fa-brands fa-pinterest"></i></a>
      </li>
      <li class="nav-icon-stand">
        <a href="#"><i class="fa-brands fa-amazon"></i></a>
      </li>
      <li class="nav-icon-stand">
        <a href="#"><i class="fa-brands fa-youtube"></i></a>
      </li>
    </div>
  </ul>
</div>
<div class="header-general-wrapper">
  <img src="/img/header-img_unsplash.jpg" class="header-img" />
  <img src="/img/logo-white-big.svg" class="logo-big" />
</div>
<div class="navbar-categories">
  <ul class="navbar-categories-alignment">
  </ul>
</div>`;

//render categories
import { fetchAllCategories } from "./api-call.js";

async function renderCategories() {
  try {
    const allCategories = await fetchAllCategories();
    const categoriesUl = document.querySelector(".navbar-categories-alignment");

    for (let i = 0; i < allCategories.length; i++) {
      if (allCategories[i].id === 1) {
        continue;
      }
      categoriesUl.innerHTML += `
    <li class="nav-item-cat"><a href="/html/list.html?key=${allCategories[i].id}">${allCategories[i].name}</a></li>`;
    }
  } catch (error) {
    console.log(error);
  }
  //add a slug with the category-name in the href?
}
renderCategories();

// open hamburger menu
const openBtn = document.querySelector(".openBtn");
openBtn.addEventListener("click", () => {
  navModal.showModal();
});

// close hamburger menu by clicking X
const closeBtn = document.querySelector(".closeBtn");
closeBtn.addEventListener("click", () => {
  navModal.close();
});

//close modal by clicking outside
function onClick(event) {
  if (event.target === navModal) {
    navModal.close();
  }
}
navModal.addEventListener("click", onClick);

// render footer
const footer = document.querySelector("footer");
footer.innerHTML += `
<div class="some-footer-wrapper">
<div class="some-cta">follow us for more inspiration</div>
<div class="some-icons">
  <a href="#"><i class="fa-brands fa-pinterest"></i></a>
  <a href="#"><i class="fa-brands fa-amazon"></i></a>
  <a href="#"><i class="fa-brands fa-youtube"></i></a>
</div>
</div>
<div class="logo-footer-wrapper">
<div class="logo-gray-footer"><img src="/img/logo-white-big.svg" /></div>
</div>`;
