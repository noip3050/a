let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// تحميل الأسئلة من الخادم
async function loadQuestions() {
    try {
        const response = await fetch('http://localhost:4000/questions'); // تأكد من استخدام المنفذ الصحيح
        questions = await response.json();
        loadQuestion();
    } catch (error) {
        console.error('فشل في تحميل الأسئلة:', error);
        document.getElementById('quiz-container').innerHTML = '<h2>فشل في تحميل الأسئلة.</h2>';
    }
}

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const quizContainer = document.getElementById('quiz-container');
        const question = questions[currentQuestionIndex];
        quizContainer.innerHTML = `
            <div class="question-container">
                <h2>${question.text}</h2>
                ${question.options.map((option, index) => `
                    <div class="option" onclick="selectAnswer(${index})">${option}</div>
                `).join('')}
            </div>
        `;
    } else {
        showResult();
    }
}

function selectAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    if (selectedIndex === question.correctAnswer) {
        score++;
        options[selectedIndex].classList.add('correct');
    } else {
        options[selectedIndex].classList.add('wrong');
    }
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1000);
}

function showResult() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('score').innerText = score;
}

function goToHomePage() {
    window.location.href = 'index.html'; 
}

// تحميل الأسئلة عند تحميل الصفحة
loadQuestions();
