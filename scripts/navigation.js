const hamButton = document.querySelector("#ham-btn");
const navLinks = document.querySelector("#nav-bar");

hamButton.addEventListener("click", () => {
    hamButton.classList.toggle("show");
    navLinks.classList.toggle("show");
})