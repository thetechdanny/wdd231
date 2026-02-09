import { places } from '../data/discover.mjs';

const discover = document.querySelector("#discover");
const dialog = document.querySelector("#placeDialog");
const closeDialog = document.querySelector("#closeDialog");

places.forEach(place => {
    const discoverCard = document.createElement("div");
    discoverCard.classList.add("discoverPageCard");

    const name = document.createElement("h2");
    const image = document.createElement("img");
    const address = document.createElement("address");
    const description = document.createElement("p");
    const button = document.createElement("button");

    name.innerHTML = `${place.name}`;
    address.innerHTML = `${place.location}`;
    description.innerHTML = `${place.description}`;
    image.setAttribute("src", `${place.photo}`);
    image.setAttribute("alt", `${place.name}`);
    image.setAttribute("width", `250px`);
    image.setAttribute("height", `250px`);
    button.innerHTML = "Learn More";

    button.addEventListener("click", () => {
        const placeTitle = document.querySelector("#placeTitle");
        const placeDescription = document.querySelector("#placeDescription");

        placeTitle.textContent = place.name;
        placeDescription.textContent = place.description;

        dialog.showModal();

    })

    closeDialog.addEventListener("click", () => {
        dialog.close();
    })

    discoverCard.appendChild(name);
    discoverCard.appendChild(image);
    discoverCard.appendChild(address);
    discoverCard.appendChild(description);
    discoverCard.appendChild(button);

    discover.appendChild(discoverCard);
})