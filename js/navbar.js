// // NAV-MENU
// const hamburgerMenu = document.querySelector(".hamburger-toggle");
// const navStand = document.querySelector(".navbar-standard");
// const navCat = document.querySelector(".navbar-categories");
// const headerIndex = document.querySelector(".header-display-index");
// const newsletterIndex = document.querySelector(".newsletter-signup-index");
// const logoIndex = document.querySelector(".logo-mobile-index");

// hamburgerMenu.addEventListener("click", () => {
//   navStand.classList.toggle("active");
//   navCat.classList.toggle("active");
//   headerIndex.classList.toggle("active");
//   newsletterIndex.classList.toggle("active");
//   logoIndex.classList.toggle("active");
// });

// NAV-MENU - made better??
const hamburgerMenu = document.querySelector(".hamburger-toggle");
const displayOn = document.querySelectorAll(".on");
const displayOff = document.querySelectorAll(".off");
const displayFlex = document.querySelectorAll(".on-ex");

hamburgerMenu.addEventListener("click", () => {
  displayOn.forEach((element) => {
    element.classList.toggle("active");
  });
  displayOff.forEach((element) => {
    element.classList.toggle("active");
  });
  displayFlex.forEach((element) => {
    element.classList.toggle("active");
  });
});
