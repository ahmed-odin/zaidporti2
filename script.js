const photos = [...document.querySelectorAll(".photo")];
const filters = [...document.querySelectorAll(".filter")];
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");
let activePhoto = 0;

function showPhoto(index) {
  activePhoto = (index + photos.length) % photos.length;
  const photo = photos[activePhoto];
  const image = photo.querySelector("img");
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  lightbox.querySelector(".lightbox__title").textContent = photo.dataset.title;
  lightbox.querySelector(".lightbox__location").textContent = photo.dataset.location;
}

photos.forEach((photo, index) => {
  photo.addEventListener("click", () => {
    showPhoto(index);
    lightbox.showModal();
    document.body.classList.add("no-scroll");
  });
});

lightbox.querySelector(".lightbox__close").addEventListener("click", () => lightbox.close());
lightbox.querySelector(".lightbox__previous").addEventListener("click", () => showPhoto(activePhoto - 1));
lightbox.querySelector(".lightbox__next").addEventListener("click", () => showPhoto(activePhoto + 1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener("close", () => document.body.classList.remove("no-scroll"));
document.addEventListener("keydown", (event) => {
  if (!lightbox.open) return;
  if (event.key === "ArrowLeft") showPhoto(activePhoto - 1);
  if (event.key === "ArrowRight") showPhoto(activePhoto + 1);
});

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filters.forEach((item) => {
      const selected = item === filter;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    photos.forEach((photo) => {
      photo.classList.toggle("is-hidden", filter.dataset.filter !== "all" && photo.dataset.category !== filter.dataset.filter);
    });
  });
});

menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  menuToggle.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
  navigation.classList.toggle("is-open", !expanded);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
  });
});
