//render categories
import { fetchAllCategories, id } from "./api-call.js";
import { generalErrorMessage } from "./error-handling.js";

//see if you can make this code more readable/clean it up so you can add error-handling to more content
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
      <li class="nav-item-stand"><a href="/./index.html">Home</a></li>
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

async function renderCategories() {
  try {
    const allCategories = await fetchAllCategories();
    const categoriesUl = document.querySelector(".navbar-categories-alignment");

    for (let i = 0; i < allCategories.length; i++) {
      if (allCategories[i].id === 1) {
        continue;
      }
      categoriesUl.innerHTML += `
    <li class="nav-item-cat ${allCategories[i].slug}"><a href="/html/list.html?key=${allCategories[i].slug}&id=${allCategories[i].id}">${allCategories[i].name}</a></li>`;
    }

    const category = document.querySelectorAll(".nav-item-cat");
    for (let i = 0; i < category.length; i++) {
      if (category[i].className === "nav-item-cat " + id) {
        console.log(category[i]);
        category[i].classList.toggle("active");
      }
    }
  } catch (error) {
    generalErrorMessage(error);
    console.log(error);
  }
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
<div class="logo-gray-footer"><img src="/img/logo-big-3.svg" /></div>
</div>`;
