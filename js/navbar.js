// render header/navbar
const modal = document.querySelector("[data-modal]");
modal.innerHTML += `
<a data-close-modal href="#" class="hamburger-toggle closeBtn">
  <i class="fa-solid fa-xmark"></i>
</a>
<div class="logo-mobile">
  <a href="#"><img src="/img/logo-black.png" /></a>
</div>
<div class="navbar-standard">
  <ul class="navbar-standard-alignment">
    <div class="standard-links">
      <li class="nav-item-stand"><a href="#">Home</a></li>
      <li class="nav-item-stand"><a href="html/about.html">About</a></li>
      <li class="nav-item-stand"><a href="html/contact.html">Contact</a></li>
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
    <li class="nav-item-cat"><a href="/html/list.html">Micro living</a></li>
    <li class="nav-item-cat"><a href="#">Vanlife</a></li>
    <li class="nav-item-cat"><a href="#">Boatlife</a></li>
    <li class="nav-item-cat"><a href="#">Self Reliance</a></li>
    <li class="nav-item-cat"><a href="#">DIY</a></li>
    <li class="nav-item-cat"><a href="#">Tinyhouse</a></li>
  </ul>
</div>`;

// open hamburger menu
const openBtn = document.querySelector("[data-open-modal]");
openBtn.addEventListener("click", () => {
  // modal.style.opacity = "1";
  modal.showModal();
});

// close hamburger menu by clicking X
const closeBtn = document.querySelector("[data-close-modal]");
closeBtn.addEventListener("click", () => {
  modal.close();
});

// close hamburger menu by clicking outside the menu
function onClick(event) {
  if (event.target === modal) {
    modal.close();
  }
}
modal.addEventListener("click", onClick);
