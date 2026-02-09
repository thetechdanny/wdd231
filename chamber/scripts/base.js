document.querySelector("#lastModified").innerHTML = document.lastModified;

const currentYearElement = document.querySelector("#currentYear");

const year = new Date().getFullYear();

currentYearElement.innerHTML = year;

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

// Handle last visit display using localStorage
const lastVisitElement = document.querySelector(".lastVisit");
const lastVisitDate = localStorage.getItem("lastVisitDate");
const currentDate = Date.now();

if (!lastVisitDate) {
    // First visit
    lastVisitElement.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const timeDifference = currentDate - parseInt(lastVisitDate);
    const millisecondsPerDay = 86400000; // 24 * 60 * 60 * 1000

    if (timeDifference < millisecondsPerDay) {
        // Less than a day
        lastVisitElement.textContent = "Back so soon! Awesome!";
    } else {
        // Calculate number of days
        const daysDifference = Math.floor(timeDifference / millisecondsPerDay);
        const dayText = daysDifference === 1 ? "day" : "days";
        lastVisitElement.textContent = `You last visited ${daysDifference} ${dayText} ago.`;
    }
}

// Store current visit date
localStorage.setItem("lastVisitDate", currentDate.toString());