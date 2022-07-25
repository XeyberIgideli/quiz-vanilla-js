function Question(questionText, answerOptions, trueAnswer) {
    this.questionText = questionText;
    this.answerOptions = answerOptions;
    this.trueAnswer = trueAnswer;
    this.checkAnwers = function (answer) {
        return answer === this.trueAnswer;
    }
}

const questions = [
    new Question('What country has the highest life expectancy?', {
        a: 'Hong Kong',
        b: 'Rome',
        c: 'Istanbul',
        d: 'Brussel'
    }, 'a'),
    new Question('Where would you be if you were standing on the Spanish Steps?', {
        a: 'Paris',
        b: 'London',
        c: 'Rome',
        d: 'Oslo'
    }, 'c'),
    new Question('Which language has the more native speakers: English or Spanish?', {
        a: 'English',
        b: 'Spanish'
    }, 'a'),
    new Question('Who was the Ancient Greek God of the Sun?', {
        a: 'Zeus',
        b: 'Apollo',
        c: 'Poseidon',
        d: 'Artemis'
    }, 'b'),
    new Question('Wha famously crossed the Alps with elephants on the way to a war the Romans?', {
        a: 'Hannibal',
        b: 'Alexander The Great',
        c: 'Dara II',
        d: 'Atropat'
    }, 'a'),
    new Question('In what country is the Chernobyl nuclear plant located?', {
        a: 'Moldova',
        b: 'Romania',
        c: 'Belarus',
        d: 'Ukraine'
    }, 'd'),
    new Question('Which planet has the most moons?', {
        a: 'Jupiter',
        b: 'Mars',
        c: 'Saturn',
        d: 'Mercury'
    }, 'c'),
    new Question('What character has both Robert Downey Jr. and Benedict Cumberbatch played?', {
        a: 'Sherlock Holmes',
        b: 'Harry Potter',
        c: 'Witcher',
        d: 'Percy Jackson'
    }, 'a')
];

function Quiz(questions) {
    this.questions = questions;
    this.questionIndex = 0;
    this.score = 0;
}

Quiz.prototype.getQuestions = function () {
    return this.questions[this.questionIndex];
}
Quiz.prototype.displayScore = function(qTotal,correctAnswer) {
    let tag = `You have ${correctAnswer} correct answer of total ${qTotal} questions`;
    document.querySelector('.score-text').innerHTML = tag;
}
const quiz = new Quiz(questions); 