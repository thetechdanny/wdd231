const score = parseInt(localStorage.getItem("quizScore")) || 0;
const total = parseInt(localStorage.getItem("quizTotal")) || 0;
const category = localStorage.getItem("quizCategory") || "General";
const userName = localStorage.getItem("userName") || "User";

// Calculate percentage
const percentage = total > 0 ? Math.round((score / total) * 100) : 0;


const scoreValue = document.getElementById("scoreValue");
const totalValue = document.getElementById("totalValue");
const categoryDisplay = document.getElementById("categoryDisplay");
const feedbackMessage = document.getElementById("feedbackMessage");
const percentageValue = document.getElementById("percentageValue");
const progressFill = document.getElementById("progressFill");

// Update score display
scoreValue.textContent = score;
totalValue.textContent = total;

// Update category badge
categoryDisplay.textContent = category + " Quiz Report";
categoryDisplay.className = `categoryBadge ${category.toLowerCase()}`;

// Determine feedback message based on percentage
let message = "";
let messageClass = "";

if (percentage === 100) {
    message = "Perfect Score! 🏆";
    messageClass = "excellent";
} else if (percentage >= 80) {
    message = "Excellent Score! You are well above average! 👍";
    messageClass = "excellent";
} else if (percentage >= 60) {
    message = "Good job! You can do better! 👍";
    messageClass = "good";
} else if (percentage >= 40) {
    message = "Not bad! Review Course and try again! 📖";
    messageClass = "fair";
} else {
    message = "Need lots of Study and Practice 💪";
    messageClass = "needswork";
}

feedbackMessage.textContent = message;
feedbackMessage.className = `feedbackText ${messageClass}`;

// Update percentage display
percentageValue.textContent = `${percentage}%`;
progressFill.style.width = `${percentage}%`;

// Set progress bar color based on percentage
if (percentage === 100) {
    progressFill.style.backgroundColor = "#27ae60";
} else if (percentage >= 80) {
    progressFill.style.backgroundColor = "#2ecc71";
} else if (percentage >= 60) {
    progressFill.style.backgroundColor = "#f39c12";
} else if (percentage >= 40) {
    progressFill.style.backgroundColor = "#e67e22";
} else {
    progressFill.style.backgroundColor = "#e74c3c";
}

const welcomeMessage = document.querySelector("#welcomeMessage");
if (welcomeMessage) {
    welcomeMessage.innerHTML = `<p>Welcome Back, ${userName}</p>`;
}

