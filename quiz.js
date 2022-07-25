function Question(questionText, answerOptions, trueAnswer) {
    this.questionText = questionText;
    this.answerOptions = answerOptions;
    this.trueAnswer = trueAnswer;
    this.checkAnwers = function (answer) {
        return answer === this.trueAnswer;
    }
}

const questions = [
    new Question('Ananas ne rengdir?', {
        a: 'qirmizi',
        b: 'sari',
        c: 'yasil',
        d: 'mavi'
    }, 'b'),
    new Question('Badimcan ne rengdir?', {
        a: 'qirmizi',
        b: 'sari',
        c: 'yasil',
        d: 'qara'
    }, 'd'),
    new Question('Xiyar ne rengdir?', {
        a: 'qirmizi',
        b: 'qehveyi',
        c: 'yasil',
        d: 'cehrayi'
    }, 'c'),
    new Question('Portagal ne rengdir?', {
        a: 'narinci',
        b: 'mavi',
        c: 'sari',
        d: 'benovseyi'
    }, 'a')
];

function Quiz(questions) {
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestions = function (questionIndex) {
    return this.questions[this.questionIndex];
}

const quiz = new Quiz(questions);