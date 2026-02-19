// Get data from localStorage
const score = parseInt(localStorage.getItem("quizScore")) || 0;
const total = parseInt(localStorage.getItem("quizTotal")) || 0;
const category = localStorage.getItem("quizCategory") || "General";
const userName = localStorage.getItem("userName") || "User";
const feedbackDataString = localStorage.getItem("feedbackData");

// Parse feedback data
let feedbackData = [];
if (feedbackDataString) {
    try {
        feedbackData = JSON.parse(feedbackDataString);
    } catch (error) {
        console.error("Error parsing feedback data:", error);
    }
}

// Calculate percentage
const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

// Get DOM elements
const feedbackContainer = document.getElementById("feedbackContainer");
const categoryDisplay = document.getElementById("categoryDisplay");
const totalQuestionsElement = document.getElementById("totalQuestions");
const correctCountElement = document.getElementById("correctCount");
const scorePercentageElement = document.getElementById("scorePercentage");

// Update category badge
categoryDisplay.textContent = category + " Quiz Feedback";
categoryDisplay.className = `categoryBadge ${category.toLowerCase()}`;

// Update summary statistics
totalQuestionsElement.textContent = total;
correctCountElement.textContent = score;
scorePercentageElement.textContent = percentage + "%";

// Create feedback items
feedbackData.forEach((item, index) => {
    const feedbackItem = document.createElement("div");
    feedbackItem.classList.add("feedbackItem");
    
    if (item.isCorrect) {
        feedbackItem.classList.add("correct");
    } else {
        feedbackItem.classList.add("incorrect");
    }

    // Question number and text
    const questionSection = document.createElement("div");
    questionSection.classList.add("questionSection");
    
    const questionHeader = document.createElement("div");
    questionHeader.classList.add("questionHeader");
    
    const questionNumber = document.createElement("span");
    questionNumber.classList.add("questionNumber");
    questionNumber.textContent = `Question ${index + 1}`;
    
    const statusBadge = document.createElement("span");
    statusBadge.classList.add("statusBadge");
    if (item.isCorrect) {
        statusBadge.classList.add("correct-badge");
        statusBadge.textContent = "✓ - Correct";
    } else {
        statusBadge.classList.add("incorrect-badge");
        statusBadge.textContent = "X - Wrong";
    }
    
    questionHeader.appendChild(questionNumber);
    questionHeader.appendChild(statusBadge);
    questionSection.appendChild(questionHeader);
    
    const questionText = document.createElement("h4");
    questionText.classList.add("questionText");
    questionText.textContent = item.question;
    questionSection.appendChild(questionText);
    
    feedbackItem.appendChild(questionSection);

    // User's answer section
    const userAnswerSection = document.createElement("div");
    userAnswerSection.classList.add("answerSection", "userAnswerSection");
    
    const userAnswerTitle = document.createElement("h5");
    userAnswerTitle.classList.add("answerTitle");
    userAnswerTitle.textContent = "Your Answer:";
    userAnswerSection.appendChild(userAnswerTitle);
    
    const userAnswerBox = document.createElement("div");
    userAnswerBox.classList.add("answerBox", "userAnswer");
    const userAnswerText = document.createElement("p");
    userAnswerText.textContent = item.userAnswer;
    userAnswerBox.appendChild(userAnswerText);
    userAnswerSection.appendChild(userAnswerBox);
    
    feedbackItem.appendChild(userAnswerSection);

    // Correct answer section 
    if (!item.isCorrect) {
        const correctAnswerSection = document.createElement("div");
        correctAnswerSection.classList.add("answerSection", "correctAnswerSection");
        
        const correctAnswerTitle = document.createElement("h5");
        correctAnswerTitle.classList.add("answerTitle");
        correctAnswerTitle.textContent = "Correct Answer:";
        correctAnswerSection.appendChild(correctAnswerTitle);
        
        const correctAnswerBox = document.createElement("div");
        correctAnswerBox.classList.add("answerBox", "correctAnswer");
        const correctAnswerText = document.createElement("p");
        correctAnswerText.textContent = item.correctAnswer;
        correctAnswerBox.appendChild(correctAnswerText);
        correctAnswerSection.appendChild(correctAnswerBox);
        
        feedbackItem.appendChild(correctAnswerSection);
    }

    feedbackContainer.appendChild(feedbackItem);
});

// If no feedback data, show a message
if (feedbackData.length === 0) {
    const noDataMessage = document.createElement("div");
    noDataMessage.classList.add("noDataMessage");
    noDataMessage.innerHTML = `
        <p>No feedback data available. Please take a quiz first.</p>
        <a href="quiz.html" class="retakeBtn">Take a Quiz</a>
    `;
    feedbackContainer.appendChild(noDataMessage);
}
