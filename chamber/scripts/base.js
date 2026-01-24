document.querySelector("#lastModified").innerHTML = document.lastModified;

const currentDate = document.querySelector("#currentYear");

const year = new Date().getFullYear();

currentDate.innerHTML = year;

const hamButton = document.querySelector("#hamBtn");
const navButton = document.querySelector("#nav-bar");
const darkModeButton = document.querySelectorAll(".darkmodeButton");

hamButton.addEventListener("click", () => {
    hamButton.classList.toggle("show");
    navButton.classList.toggle("show");
})

// Dark Mode Toggle
darkModeButton.forEach(btn => {
    btn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    })
});

window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
});