const quizBox = document.querySelector('.quiz_box');
const scoreBox = document.querySelector('.score_box');
const questionText = document.querySelector('.question_text');
const optionList = document.querySelector('.option_list');
const question_index = document.querySelector('.question-index');
const point = document.querySelector('.point');

const correctSound = document.querySelector('audio');
const incorrectSound = document.querySelector('.incorrect-sound');

const nextBtn = document.querySelector('.next-btn');
const btnStart = document.querySelector('.btn_start');
const btnReplay = document.querySelector('.btn-replay');
const btnQuite = document.querySelector('.btn-quite');

const timeSecond = document.querySelector('.time-second');
const timeText = document.querySelector('.time-text');
const timeLine = document.querySelector('.time-line');

const correctIcon = '<div class="icon"><i class="fas fa-check"></i></div>';
const incorrectIcon = '<div class="icon"><i class="fas fa-times"></i></div>';


// Checking answers

function checking(question) {
    
    const allOption = optionList.querySelectorAll('.option');

   allOption.forEach(opt => {
    opt.addEventListener('click', function(e) {
        const dataAnswer = e.target.firstElementChild.dataset.quest;
        clearInterval(counter);
        clearInterval(counterLine);
        if(question.checkAnwers(dataAnswer)) {
            correctSound.play();
            quiz.score++;
            opt.classList.add('correct');
            opt.insertAdjacentHTML('beforeend', correctIcon)
        } else {            
            incorrectSound.play();
            opt.classList.add('incorrect');
            opt.insertAdjacentHTML('beforeend', incorrectIcon)
        }

        allOption.forEach(opti => {
            opti.classList.add('disabled')
        });
        
         nextBtn.classList.add('show')
    });
   });
}

// Displaying questions

function displayQuestions(question) {
    let qText = `<span>${question.questionText}</span>`;

    let option = '';

    for (let answer in question.answerOptions) {
        option +=
            `
            <div class="option">
                <span data-quest='${answer}'>${answer}: ${question.answerOptions[answer]}</span> 
             </div> 
            `;

    }
    questionText.innerHTML = qText;
    optionList.innerHTML = option;

    checking(question);
}

function displayQuestionCount (qRange, qTotal) {
    let tag = `<span class="badge bg-warning">${qRange} / ${qTotal}</span>`; 

    question_index.innerHTML = tag;
}



function startQuiz() {
    quizBox.classList.add('active'); 
    btnStart.style.display = 'none'
    startTimer(10);
    timeWidthLine(10);
    nextBtn.classList.remove('show');
    point.textContent = localStorage.getItem('score');
    displayQuestions(quiz.getQuestions());
    displayQuestionCount(quiz.questionIndex + 1, quiz.questions.length)
}

function nextQuiz() {
    if(quiz.questions.length !== quiz.questionIndex + 1) {
        quiz.questionIndex++; 
        clearInterval(counter);
        clearInterval(counterLine);        
        timeText.textContent = 'Timeleft:'; 
        
        timeWidthLine(10);
        startTimer(10);
        nextBtn.classList.remove('show') 

        displayQuestions(quiz.getQuestions());
        displayQuestionCount(quiz.questionIndex + 1, quiz.questions.length)
    } else { 
        clearInterval(counter);
        clearInterval(counterLine);
        quizBox.classList.remove('active'); 
        scoreBox.classList.add('active');  

        quiz.displayScore(quiz.questions.length, quiz.score);

        localStorage.setItem('score', quiz.score);
    }
}

// Question timer

let counter;
function startTimer(time) {
    counter = setInterval(timer,1000);
    
    function timer() {
        timeSecond.textContent = time;
        time--;  

        if(time < 0) {
            clearInterval(counter);

            timeText.textContent = 'Time Ended'; 
            const allOption = optionList.querySelectorAll('.option');

            allOption.forEach(opt => {
                const optes = opt.firstElementChild.dataset.quest;
                if(quiz.getQuestions().checkAnwers(optes)) {
                    incorrectSound.play(); 
                    opt.classList.add('correct');
                    opt.insertAdjacentHTML('beforeend', correctIcon);

                    allOption.forEach(opti => {
                        opti.classList.add('disabled')
                    });

                    
                   nextBtn.classList.add('show')
                }
            })
        }
    }
}

// Progress bar line

let counterLine;
function timeWidthLine (time) { 
   counterLine = setInterval(timer, 100);

    function timer() { 
        time--; 
        let linewidth = time + 93;
        timeLine.style.width = linewidth + '%'; 
 
    }
   
}

// Events

btnStart.addEventListener('click', startQuiz);

nextBtn.addEventListener('click', nextQuiz);

btnQuite.addEventListener('click', function() {
    window.location.reload();
})

btnReplay.addEventListener('click', function() {
   quiz.questionIndex = 0;
   quiz.score = 0;   
   scoreBox.classList.remove('active'); 
   btnStart.click();
});
