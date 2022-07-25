const quizBox = document.querySelector('.quiz_box');
const questionText = document.querySelector('.question_text');
const optionList = document.querySelector('.option_list');
const btnStart = document.querySelector('.btn_start')
const question_index = document.querySelector('.question-index')
const nextBtn = document.querySelector('.next-btn');
const correctSound = document.querySelector('audio');

const correctIcon = '<div class="icon"><i class="fas fa-check"></i></div>';
const incorrectIcon = '<div class="icon"><i class="fas fa-times"></i></div>';

btnStart.addEventListener('click', function () {
    quizBox.classList.add('active'); 
    
    let question = quiz.getQuestions();

    nextBtn.classList.remove('show');

    displayQuestions(question);
    displayQuestionCount(quiz.questionIndex + 1, quiz.questions.length)
});

nextBtn.addEventListener('click', function () { 
    if(quiz.questions.length !== quiz.questionIndex + 1) {
        quiz.questionIndex++;
        console.log(quiz.questionIndex)
        nextBtn.classList.remove('show')

        let question = quiz.getQuestions();

        displayQuestions(question);
        displayQuestionCount(quiz.questionIndex + 1, quiz.questions.length)
    } else {
        console.log('sual bitdi brat')
    }
});

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

    const allOption = optionList.querySelectorAll('.option');

   allOption.forEach(opt => {
    opt.addEventListener('click', function(e) {
        const dataAnswer = e.target.firstElementChild.dataset.quest;

        if(question.checkAnwers(dataAnswer)) {
            correctSound.play();
            opt.classList.add('correct');
            opt.insertAdjacentHTML('beforeend', correctIcon)
        } else {            
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

function displayQuestionCount (qRange, qTotal) {
    let tag = `<span class="badge bg-warning">${qRange} / ${qTotal}</span>`; 

    question_index.innerHTML = tag;
}