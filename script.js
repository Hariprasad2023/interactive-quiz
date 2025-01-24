const quizData = [
    {
        question: "Who is known as 'The Little Master' in cricket?",
        options: ["Ricky Ponting", "Sachin Tendulkar", "Brian Lara", "Steve Waugh"],
        correct: "Sachin Tendulkar"
    },
    {
        question: "How many players are there in a cricket team?",
        options: ["10", "11", "12", "9"],
        correct: "11"
    },
    {
        question: "Which country won the first Cricket World Cup in 1975?",
        options: ["Australia", "England", "West Indies", "India"],
        correct: "West Indies"
    },
    {
        question: "What is the term for a score of zero by a batsman?",
        options: ["Strike", "Duck", "Maiden", "Stumped"],
        correct: "Duck"
    },
    {
        question: "How many wickets does a bowler need to take for a 'hat-trick'?",
        options: ["2", "3", "4", "5"],
        correct: "3"
    },
    {
        question: "Which cricket stadium is known as 'The Lord's'?",
        options: ["MCG", "Eden Gardens", "Lord's Cricket Ground", "The Oval"],
        correct: "Lord's Cricket Ground"
    },
    {
        question: "Who holds the record for most international centuries?",
        options: ["Ricky Ponting", "Virat Kohli", "Sachin Tendulkar", "Steve Smith"],
        correct: "Sachin Tendulkar"
    },
    {
        question: "What is the duration of a standard Test match?",
        options: ["3 days", "4 days", "5 days", "7 days"],
        correct: "5 days"
    },
    {
        question: "How many runs are scored on a Six?",
        options: ["4", "6", "2", "1"],
        correct: "6"
    },
    {
        question: "Which delivery is bowled without spinning the ball?",
        options: ["Googly", "Yorker", "Bouncer", "Doosra"],
        correct: "Yorker"
    }
];

let currentQuestion = 0;
let score = 0;
let skipped_questions = 0;
let timer;

function displayQuiz() {
    const quiz = document.getElementById('quiz');
    const questionData = quizData[currentQuestion];
    
    const optionsHtml = questionData.options
        .map((option, index) => `
            <li class="option" onclick="selectOption(this)">${option}</li>
        `).join('');

    quiz.innerHTML = `
        <div class="question">${currentQuestion + 1}. ${questionData.question}</div>
        <ul class="options">${optionsHtml}</ul>
        <div id="timer">30</div>
    `;
    
    updateProgress();
    startTimer();
}

function selectOption(optionElement) {
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    optionElement.classList.add('selected');
}

function updateProgress() {
    const progress = document.querySelector('.progress');
    const progressWidth = ((currentQuestion + 1) / quizData.length) * 100;
    progress.style.width = progressWidth + '%';
}

function startTimer() {
    let timeLeft = 30;
    const timerElement = document.getElementById('timer');

    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitQuiz();
        } else {
            timerElement.textContent = `${timeLeft}`;
            
            if (timeLeft <= 10 && timeLeft > 5) {
                timerElement.style.color = '#8B0000'; // Dark Red for 5-10 seconds
            } else if (timeLeft <= 5) {
                timerElement.style.color = 'red'; // Red for last 5 seconds
            } else {
                timerElement.style.color = 'black'; // Default color
            }

            timeLeft--;
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function submitQuiz() {
    const selectedOption = document.querySelector('.option.selected');

    if (!selectedOption) {
        // Increment skipped_questions only if the user didn't select an option
        skipped_questions++;
    } else {
        // If selected option is correct, increase the score
        if (selectedOption.textContent === quizData[currentQuestion].correct) {
            score++;
        }
    }

    currentQuestion++;

    // If there are more questions, display the next one
    if (currentQuestion < quizData.length) {
        displayQuiz();
    } else {
        showResults();
    }
}

function showResults() {
    const quiz = document.getElementById('quiz');
    const result = document.getElementById('result');
    const submitBtn = document.querySelector('.submit-btn');
    
    quiz.style.display = 'none';
    submitBtn.style.display = 'none';
    result.style.display = 'block';
    
    const percentage = (score / quizData.length) * 100;
    const resultClass = percentage >= 60 ? 'correct' : 'incorrect';
    
    result.className = resultClass;
    result.innerHTML = `
        <h2>Completed!!!</h2>
        <br>
        <p>Correct answers: ${score}</p>
        <p>Skipped questions: ${skipped_questions}</p>
        <br>
        <p>Your score: ${score}/${quizData.length}</p>
        <br>
        <p>Percentage: ${percentage}%</p>
    `;
    stopTimer();
}

displayQuiz();
