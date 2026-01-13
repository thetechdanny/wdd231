document.querySelector("#lastModified").innerHTML = document.lastModified;

const currentDate = document.querySelector("#currentYear");

const year = new Date().getFullYear();

currentDate.innerHTML = year;