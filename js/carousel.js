// CAROUSEL
const prev = document.querySelector(".prev-btn");
const next = document.querySelector(".next-btn");
const carouselSlider = document.querySelector(".slider");

//how far it will scroll:
const itemWidth = 250;
const padding = 0;

prev.addEventListener("click", () => {
  carouselSlider.scrollLeft -= itemWidth + padding;
});

next.addEventListener("click", () => {
  carouselSlider.scrollLeft += itemWidth + padding;
});
