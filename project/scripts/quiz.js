import { htmlquestions } from "../files/htmlQuizQuestions.mjs";
import { cssquestions } from "../files/cssQuizQuestions.mjs";
import { javascriptquestions } from "../files/javascriptQuizQuestions.mjs";

const nextBtn = document.querySelector("#nextBtn");
const prevBtn = document.querySelector("#prevBtn");

const htmlQuestions = document.querySelector("#htmlQuestions");
const cssQuestions = document.querySelector("#cssQuestions");
const javascriptQuestions = document.querySelector("#javascriptQuestions");

let currentIndex = 0;

function displayQuestion(questions) {

    const questionContainer = document.querySelector("#quiz-Container");

    questions.forEach(q => {
        const questionCard = document.createElement("questionCard");
        questionCard.classList.add("questionCard");


        const question = document.createElement("h3");
        const label = document.createElement("label");

        const qstIndex = 0;

        question.innerHTML = `${q.question}`;
        label.setAttribute("for", "qst");
        const input = document.createElement("input");
        input.innerHTML = `${q.options}`;

        input.forEach(i => {
            input.setAttribute("type", "radio");
            input.setAttribute("name", "answer");
            input.setAttribute("id", "qst");
            input.setAttribute("value", `${i}`);
        })

        questionCard.appendChild(question);
        questionCard.appendChild(label);
        questionCard.appendChild(input);

        questionContainer.appendChild(questionCard);

    })

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === questions.length - 1;
}

// function loadQuiz(questions) {
//     currentIndex = 0;

//     // Next button
//     nextBtn.addEventListener("click", () => {
//         if (currentIndex < questions.length - 1) {
//             currentIndex++;
//             displayQuestion(currentIndex, questions);
//         }
//     });

//     // Previous button
//     prevBtn.addEventListener("click", () => {
//         if (currentIndex > 0) {
//             currentIndex--;
//             displayQuestion(currentIndex, questions);
//         }
//     });

//     // Initial load
//     displayQuestion(currentIndex, questions);
// }

htmlQuestions.addEventListener("click", () => {
    displayQuestion(htmlquestions);
});

cssQuestions.addEventListener("click", () => {
    displayQuestion(cssquestions);
});

javascriptQuestions.addEventListener("click", () => {
    displayQuestion(javascriptquestions);
});