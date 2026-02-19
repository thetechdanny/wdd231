// Variables to store fetched question data
let htmlquestions = [];
let cssquestions = [];
let javascriptquestions = [];

const searchStrings = new URLSearchParams(window.location.search);
const welcomeMessage = document.querySelector("#welcomeMessage");

// Get user's name from URL or localStorage
let userName = searchStrings.get("name");
if (userName) {
    // Store the name in localStorage if it came from URL
    localStorage.setItem("userName", userName);
} else {
    // Retrieve from localStorage if not in URL
    userName = localStorage.getItem("userName") || "Guest";
}

welcomeMessage.innerHTML = `<p>Welcome ${userName}</p>`;

const nextBtn = document.querySelector("#nextBtn");
const prevBtn = document.querySelector("#prevBtn");

const htmlQuestions = document.querySelector("#htmlQuestions");
const cssQuestions = document.querySelector("#cssQuestions");
const javascriptQuestions = document.querySelector("#javascriptQuestions");
const navButton = document.querySelector(".button-navigation");
const closeCourse = document.querySelector(".closeCourse");
const quizContainer = document.querySelector(".quizContainer");
const motivationalQuote = document.querySelector(".motivationalQuote");

// Modal elements
const endCourseModal = document.querySelector("#endCourseModal");
const endCourseConfirmBtn = document.querySelector("#endCourseConfirmBtn");
const endCourseCancelBtn = document.querySelector("#endCourseCancelBtn");
const submitQuizModal = document.querySelector("#submitQuizModal");
const submitQuizConfirmBtn = document.querySelector("#submitQuizConfirmBtn");
const submitQuizCancelBtn = document.querySelector("#submitQuizCancelBtn");

let currentIndex = 0;
let selectedQuestions = [];
let userAnswers = [];

// Fetch JSON files with try-catch blocks
async function loadQuestions() {
    try {
        const htmlResponse = await fetch("./files/htmlQuizQuestions.json");
        if (!htmlResponse.ok) throw new Error("Failed to load HTML questions");
        htmlquestions = await htmlResponse.json();
    } catch (error) {
        console.error("Error loading HTML questions:", error);
    }

    try {
        const cssResponse = await fetch("./files/cssQuizQuestions.json");
        if (!cssResponse.ok) throw new Error("Failed to load CSS questions");
        cssquestions = await cssResponse.json();
    } catch (error) {
        console.error("Error loading CSS questions:", error);
    }

    try {
        const jsResponse = await fetch("./files/javascriptQuizQuestions.json");
        if (!jsResponse.ok) throw new Error("Failed to load JavaScript questions");
        javascriptquestions = await jsResponse.json();
    } catch (error) {
        console.error("Error loading JavaScript questions:", error);
    }
}

// Load questions when the page loads
loadQuestions();

const questionContainer = document.querySelector("#quiz-Container");

function loadQuestion() {
    questionContainer.innerHTML = "";

    const q = selectedQuestions[currentIndex];

    const questionCard = document.createElement("div");
    questionCard.classList.add("questionCard");

    const question = document.createElement("h3");
    question.textContent = q.question;
    questionCard.appendChild(question);

    q.options.forEach((option, i) => {
        const label = document.createElement("label");

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "answer";
        input.value = i;

        // restore checked state
        if (userAnswers[currentIndex] === i) {
            input.checked = true;
        }

        input.addEventListener("change", () => {
            userAnswers[currentIndex] = i;
        });

        label.appendChild(input);
        label.append(` ${option}`);

        questionCard.appendChild(label);
        questionCard.appendChild(document.createElement("br"));
    });

    questionContainer.appendChild(questionCard);

    prevBtn.disabled = currentIndex === 0;
    nextBtn.textContent =
        currentIndex === selectedQuestions.length - 1 ? "Submit" : "Next";
}

nextBtn.addEventListener("click", () => {

    if (currentIndex < selectedQuestions.length - 1) {
        currentIndex++;
        loadQuestion();
    } else {
        // Show submit confirmation modal instead of directly submitting
        submitQuizModal.showModal();
    }

});

prevBtn.addEventListener("click", () => {

    if (currentIndex > 0) {
        currentIndex--;
        loadQuestion();
    }

});


htmlQuestions.addEventListener("click", () => {
    navButton.classList.add("show");
    closeCourse.classList.add("show");
    motivationalQuote.classList.add("close");
    startQuiz(htmlquestions);
});

cssQuestions.addEventListener("click", () => {
    navButton.classList.add("show");
    closeCourse.classList.add("show");
    motivationalQuote.classList.add("close");
    startQuiz(cssquestions);
});

javascriptQuestions.addEventListener("click", () => {
    navButton.classList.add("show");
    closeCourse.classList.add("show");
    motivationalQuote.classList.add("close");
    startQuiz(javascriptquestions);
});

closeCourse.addEventListener("click", () => {
    // Show end course confirmation modal instead of directly closing
    endCourseModal.showModal();
    motivationalQuote.classList.remove("close");
})

function startQuiz(questions) {
    selectedQuestions = questions;
    currentIndex = 0;
    userAnswers = [];
    quizContainer.classList.remove("closeContainer");
    loadQuestion();
}

// End Course Modal Event Listeners
endCourseConfirmBtn.addEventListener("click", () => {
    endCourseModal.close();
    quizContainer.classList.add("closeContainer");
    navButton.classList.remove("show");
    closeCourse.classList.remove("show");
    currentIndex = 0;
    selectedQuestions = [];
    userAnswers = [];
});

endCourseCancelBtn.addEventListener("click", () => {
    endCourseModal.close();
});

// Submit Quiz Modal Event Listeners
submitQuizConfirmBtn.addEventListener("click", () => {
    submitQuizModal.close();
    showResults();
});

submitQuizCancelBtn.addEventListener("click", () => {
    submitQuizModal.close();
});

function showResults() {

    let score = 0;
    let category = "General";

    // Determine which quiz category was taken
    if (selectedQuestions === htmlquestions) {
        category = "HTML";
    } else if (selectedQuestions === cssquestions) {
        category = "CSS";
    } else if (selectedQuestions === javascriptquestions) {
        category = "JavaScript";
    }

    // Build detailed feedback data
    const feedbackData = [];
    selectedQuestions.forEach((q, index) => {
        const userAnswerIndex = userAnswers[index];
        const isCorrect = userAnswerIndex === q.answer;
        if (isCorrect) {
            score++;
        }

        feedbackData.push({
            question: q.question,
            options: q.options,
            userAnswerIndex: userAnswerIndex,
            userAnswer: userAnswerIndex !== undefined ? q.options[userAnswerIndex] : "Not answered",
            correctAnswerIndex: q.answer,
            correctAnswer: q.options[q.answer],
            isCorrect: isCorrect
        });
    });

    // Store results in localStorage
    localStorage.setItem("quizScore", score);
    localStorage.setItem("quizTotal", selectedQuestions.length);
    localStorage.setItem("quizCategory", category);
    localStorage.setItem("feedbackData", JSON.stringify(feedbackData));

    // Redirect to result.html
    window.location.href = "result.html";
}
