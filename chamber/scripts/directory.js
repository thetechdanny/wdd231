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


async function fetchData() {
    const response = await fetch("./data/members.json");
    const data = await response.json();
    displayCompanies(data.companies);
}


fetchData();

const companiesDisplay = document.querySelector("#companiesDisplay");

const displayCompanies = (companies) => {
    companies.forEach(company => {
        const section = document.createElement("section");
        section.classList.add("formatCard");
        const name = document.createElement("h2");
        const address = document.createElement("p");
        const phone = document.createElement("p");
        const website = document.createElement("a");
        const logo = document.createElement("img");

        name.innerHTML = `${company.name}`;
        address.innerHTML = `Address: ${company.address}`;
        phone.innerHTML = `Phone: ${company.phone}`;
        website.innerHTML = `Website: ${company.website}`;
        website.setAttribute("href", `${company.website}`);
        logo.setAttribute("src", `${company.image}`);
        logo.setAttribute("alt", `Logo of ${company.name}`);
        logo.setAttribute("fetchpriority", "high");
        logo.setAttribute("width", "340");
        logo.setAttribute("height", "440");

        section.appendChild(logo);
        section.appendChild(name);
        section.appendChild(address);
        section.appendChild(phone);
        section.appendChild(website);

        companiesDisplay.appendChild(section);
    })
}

const gridButton = document.querySelector("#gridButton");
const listButton = document.querySelector("#listButton");
const display = document.querySelector("#companiesDisplay");


display.classList.add("grid-view");

gridButton.addEventListener("click", () => {
    display.classList.add("grid-view");
    display.classList.remove("list-view");
    localStorage.setItem("view", "grid");
});

listButton.addEventListener("click", () => {
    display.classList.add("list-view");
    display.classList.remove("grid-view");
    localStorage.setItem("view", "list");
});
