const searchStrings = new URLSearchParams(window.location.search);
const displayMessage = document.querySelector("#displayMessage");

displayMessage.innerHTML = `
<h2>Congratulations!!!</h2>
<p>You have successfully completed the membership form</p>

<div>
    <p><strong>Your Info:</strong></p>
    <p>${searchStrings.get("first")} ${searchStrings.get("last")}</p>
    <p>${searchStrings.get("email")}</p>
    <p>${searchStrings.get("tel")}</p>
    <p>${searchStrings.get("business-name")}</p>
    <p><strong>Form submitted on:</strong> ${searchStrings.get("timestamp")}</p>
</div>
`;
