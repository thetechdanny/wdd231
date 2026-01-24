async function fetchEvent() {
    const response = await fetch("./data/events.json");
    const data = await response.json();
    displayEvents(data.events);
}

fetchEvent();

const eventsDisplay = document.querySelector("#events");
let currentSlide = 0;
let allEvents = [];
let autoSlideTimer = null;

const displayEvents = (events) => {
    allEvents = events;

    showSlide(0);
    startAutoSlide();
}

const showSlide = (index) => {
    eventsDisplay.innerHTML = '';

    // Display 2 events at a time
    for (let i = 0; i < 2 && index + i < allEvents.length; i++) {
        const event = allEvents[index + i];
        const eventCard = document.createElement("div");
        eventCard.classList.add("formatEventCard", "slideIn");
        const eventName = document.createElement("h3");
        const eventDate = document.createElement("p");
        const eventVenue = document.createElement("p");
        const eventImage = document.createElement("img");

        eventName.innerHTML = `${event.event}`;
        eventDate.innerHTML = `Event Date: ${event.date}`;
        eventVenue.innerHTML = `Event Venue: ${event.venue}`;
        eventImage.setAttribute("src", `${event.image}`);
        eventImage.setAttribute("alt", `${event.name}`);
        eventImage.setAttribute("fetchpriority", "high");
        eventImage.setAttribute("width", `250`);
        eventImage.setAttribute("height", `auto`);

        eventCard.appendChild(eventImage);
        eventCard.appendChild(eventName);
        eventCard.appendChild(eventVenue);
        eventCard.appendChild(eventDate);

        // Stagger animation for second card
        eventCard.style.animationDelay = (i * 0.2) + "s";

        eventsDisplay.appendChild(eventCard);
    }
}

const startAutoSlide = () => {
    autoSlideTimer = setInterval(() => {
        if (currentSlide + 2 < allEvents.length) {
            currentSlide += 2;
        } else {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }, 5000);
}

const stopAutoSlide = () => {
    if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
    }
}

const restartAutoSlide = () => {
    stopAutoSlide();
    startAutoSlide();
}


// FOR WEATHER
const currentWeather = document.querySelector("#currentWeather");
const weatherIcon = document.querySelector("#weatherIcon");
const weatherInfo = document.querySelector('#weatherInfo');


const myKey = "3a7c3c47246f0babd2891865fa6d8db2";
const myLat = "5.11";
const myLong = "7.36";

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            displayResults(data);
        }
        else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();

function displayResults(data) {
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const desc = data.weather[0].description;

    const imgElement = document.createElement("img");
    imgElement.setAttribute('src', iconsrc);
    imgElement.setAttribute('alt', desc);

    const temp = document.createElement("p");
    const descPara = document.createElement("p");
    const high = document.createElement("p");
    const low = document.createElement("p");
    const humidity = document.createElement("p");
    const sunrise = document.createElement("p");
    const sunset = document.createElement("p");

    temp.innerHTML = `${data.main.temp}&deg;F`;
    descPara.innerHTML = `${desc}`;
    high.innerHTML = `High: ${data.main.temp_max}&deg;F`;
    low.innerHTML = `Low: ${data.main.temp_min}&deg;F`;
    humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
    sunrise.innerHTML = `Sunrise: ${data.sys.sunrise}`;
    sunset.innerHTML = `Sunset: ${data.sys.sunset}`;

    weatherIcon.appendChild(imgElement);
    weatherInfo.appendChild(temp);
    weatherInfo.appendChild(descPara);
    weatherInfo.appendChild(high);
    weatherInfo.appendChild(low);
    weatherInfo.appendChild(humidity);
    weatherInfo.appendChild(sunrise);
    weatherInfo.appendChild(sunset);
}

// FOR 3-DAY WEATHER FORECAST
const weatherForecast = document.querySelector("#weatherForecast");
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;

async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

fetchForecast();

function displayForecast(data) {
    const forecasts = data.list;
    const seenDays = new Set();
    let dayCount = 0;

    for (let i = 0; i < forecasts.length && dayCount < 3; i++) {
        const forecast = forecasts[i];
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        const dayKey = date.toDateString();

        // Only add one forecast per day (get the first one of each day)
        if (!seenDays.has(dayKey)) {
            seenDays.add(dayKey);

            const forecastCard = document.createElement("div");
            forecastCard.classList.add("forecastCard");

            const dayElement = document.createElement("h3");
            dayElement.textContent = day;

            const tempElement = document.createElement("p");
            tempElement.innerHTML = `${Math.round(forecast.main.temp)}&deg;C`;

            forecastCard.appendChild(dayElement);
            forecastCard.appendChild(tempElement);

            weatherForecast.appendChild(forecastCard);

            dayCount++;
        }
    }
}

// FOR COMPANY LIST DISPLAY

async function fetchBusiness() {
    const response = await fetch("./data/business.json");
    const data = await response.json();
    displayBusiness(data.business);
}


fetchBusiness();

const business = document.querySelector("#business");

const displayBusiness = (companies) => {
    companies.forEach(company => {
        const businessName = document.createElement("div");
        businessName.classList.add("formatBusinessCard");
        const name = document.createElement("h3");
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
        logo.setAttribute("width", "100");
        logo.setAttribute("height", "100");


        businessName.appendChild(name);
        businessName.appendChild(address);
        businessName.appendChild(logo);
        businessName.appendChild(phone);
        businessName.appendChild(website);

        business.appendChild(businessName);
    })
}