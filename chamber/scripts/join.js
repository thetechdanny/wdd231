const membership = [
    {
        "name": "Non Profit Membership Level",
        "cost": "$200",
        "level": "Level 1",
        "benefit": "Monthly interest of $5"
    },

    {
        "name": "Bronze Membership Level",
        "cost": "$400",
        "level": "Level 2",
        "benefit": "Monthly interest of $10 plus paid trip to Bahamas"
    },

    {
        "name": "Silver Membership Level",
        "cost": "$600",
        "level": "Level 3",
        "benefit": "Monthly interest of $15, paid trip to Dubai, paid shopping spree"
    },

    {
        "name": "Gold Membership Level",
        "cost": "$800",
        "level": "Level 4",
        "benefit": "Monthly interest of $20, paid trip to Paris and Dubai, free shopping spree, premium badge display, VIP recognition badge"
    }
]


const membershipLevels = document.querySelector("#memberships");

const membershipDialog = document.querySelector("#membershipDialog");
const modalTitle = document.querySelector("#modalTitle");
const modalLevel = document.querySelector("#modalLevel");
const modalCost = document.querySelector("#modalCost");
const modalBenefit = document.querySelector("#modalBenefit");
const closeDialog = document.querySelector("#closeModal");

const displayLevels = (levels) => {
    levels.forEach((lev, index) => {
        const levelCard = document.createElement("div");
        levelCard.classList.add("membershipCard");

        const name = document.createElement("h5");
        name.textContent = lev.name;

        const button = document.createElement("button");
        button.textContent = "Learn More";

        // store index so we know which membership was clicked
        button.dataset.index = index;

        levelCard.appendChild(name);
        levelCard.appendChild(button);
        membershipLevels.appendChild(levelCard);
    });
};

displayLevels(membership);

membershipLevels.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const index = e.target.dataset.index;
        const lev = membership[index];

        modalTitle.textContent = lev.name;
        modalLevel.textContent = `Membership Level: ${lev.level}`;
        modalCost.textContent = `Cost: ${lev.cost}`;
        modalBenefit.textContent = `Benefits: ${lev.benefit}`;

        membershipDialog.showModal();
    }
});


closeDialog.addEventListener('click', () => {
    membershipDialog.close();
})

const timestampInput = document.querySelector("#timestamp");
timestampInput.value = new Date().toLocaleString();

