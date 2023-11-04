const hamburgerMenu = document.querySelector(".hamburger-toggle");
const navStand = document.querySelector(".navbar-standard");
const navCat = document.querySelector(".navbar-categories");

hamburgerMenu.addEventListener("click", () => {
  navStand.classList.toggle("active");
  navCat.classList.toggle("active");
});
