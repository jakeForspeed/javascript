const quizData = [
    {
        question:'I ……… football every Saturday. *',
        a:'playing',
        b:'am play ',
        c:'am playing',
        d:'play',
        correct:'d'
    },{
        question:'Don’t make too much noise. John ……… to take a nap. *',
        a:'try',
        b:'is trying',
        c:'tries',
        d:'tried',
        correct:'b'
    },{
        question:'Paul ……… his teeth as soon as he wakes up. *',
        a:'brushes',
        b:'is brushing',
        c:'will brush',
        d:'brush',
        correct:'c'
    },{
        question:'He can’t answer the phone. He …….. a shower. *',
        a:'is taking',
        b:'taking',
        c:'took',
        d:'take',
        correct:'a'
    },{
        question:'It ……… many times every winter in New York. *',
        a:'snowed',
        b:'is snow',
        c:'is snowing',
        d:'snows',
        correct:'d'
    }
]

const quiz = document.querySelector('.quiz')
const question = document.querySelector('.question')
const submitBtn = document.querySelector('.submitBtn')
const answers = document.querySelectorAll('.answer')
const ul = document.querySelector('ul')

const atext = document.querySelector('#a_text')
const btext = document.querySelector('#b_text')
const ctext = document.querySelector('#c_text')
const dtext = document.querySelector('#d_text')


let score = 0;
let currentQuestion = 0



function loadQuizz(){
    unSelectAnswer()
    let theQuestion = quizData[currentQuestion]

    question.innerText = theQuestion.question
    atext.innerText = theQuestion.a
    btext.innerText = theQuestion.b
    ctext.innerText = theQuestion.c
    dtext.innerText = theQuestion.d
    
}

loadQuizz()



function getSelectedAnswer(){

    let finalAnswer = undefined

    answers.forEach((answer)=>{
        if(answer.checked){
            finalAnswer = answer.id
        }
    })

    return finalAnswer
}
function unSelectAnswer(){
    answers.forEach((answer)=>{
        answer.checked = false
    })
}

const res = document.querySelector('.result')
const scoreText = document.querySelector('.score-text')

submitBtn.addEventListener('click',()=>{

    


    let selectedAns = getSelectedAnswer()

    if(selectedAns){

        if(selectedAns == quizData[currentQuestion].correct){
            score++;
        }
        currentQuestion++;
        if(currentQuestion < quizData.length){
            loadQuizz()
        }else{
            res.style.transform = 'scale(1)'
            scoreText.innerText = `${score} / ${quizData.length}`
        }
    }

})