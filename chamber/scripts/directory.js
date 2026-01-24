
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
        const name = document.createElement("h3");
        const address = document.createElement("p");
        const phone = document.createElement("p");
        const membershipLevel = document.createElement("p");
        const networth = document.createElement("p");
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
        membershipLevel.innerHTML = `Membership Level: ${company.membershipLevel}`;
        networth.innerHTML = `Networth: ${company.networth}`;

        section.appendChild(logo);
        section.appendChild(name);
        section.appendChild(address);
        section.appendChild(phone);
        section.appendChild(website);
        section.appendChild(membershipLevel);
        section.appendChild(networth);

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
