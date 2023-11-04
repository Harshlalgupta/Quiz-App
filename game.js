const question=document.querySelector('#question');
const choices=Array.from(document.querySelectorAll('.choice-text'));
const progresstext=document.querySelector('#progresstext');
const scoretext=document.querySelector('#score');
const progressbarfull=document.querySelector('#progressbarfull');

let currentquestion={}
let acceptinganswers=true
let score=0
let questioncounter=0
let availablequestions=[]

let questions=[
    {
        question: 'what is 2+2',
        choice1: '2',
        choice2: '4',
        choice3: '6',
        choice4: '8',
        answer:4,
    },
    {
        question: 'what is 12+12',
        choice1: '24',
        choice2: '42',
        choice3: '63',
        choice4: '82',
        answer:24,
    },
    {
        question: 'what is 22+22',
        choice1: '22',
        choice2: '44',
        choice3: '66',
        choice4: '88',
        answer:44,
    },
    {
        question: 'what is 20+20',
        choice1: '20',
        choice2: '40',
        choice3: '60',
        choice4: '80',
        answer:40,
    }

]

const score_points=100
const max_questions=4

startgame = () => {
    questioncounter=0
    score=0
    availablequestions=[...questions]
    getnewquestion()
}

getnewquestion = () => {
    if(availablequestions.length===0 || questioncounter>max_questions){
        localStorage.setItem('mostrecentscore',score)

        return window.location.assign('/end.html')

    }
    questioncounter++
    progresstext.innerText= `question ${questioncounter} of  ${max_questions}`
    progressbarfull.style.width=`${(questioncounter/max_questions)*100}%`

    const questionindex=Math.floor(Math.random() * availablequestions.length)
    currentquestion=availablequestions[questionindex]
    question.innerText=currentquestion.question

    choices.forEach( choice => {
        const number=choice.dataset['number']
        choice.innerText=currentquestion['choice' + number]
    })
    availablequestions.splice(questionindex,1 )

    acceptinganswers=true
}

choices.forEach( _cam => {
    _.addEventListener('click', e => {
        if(!acceptinganswers) return
        
        acceptinganswers=false
        const selectedchoice=e.target
        const selectedanswer=selectedchoice.dataset['number']

        let classtoapply=selectedanswer==currentquestion.answer ? 'correct' :
        'incorrect'

        if(classtoapply==='correct'){
            incrementscore(score_points)
        }

        selectedchoice.parentElement.classList.remove(classtoapply)
        getnewquestion()

        setTimeout(() => {
            selectedchoice.parentElement.classList.remove(classtoapply)
            getnewquestion()

        } ,1000)

    })
})

incrementscore= num => {
    score +=num
    scoretext.innerText=score

}

startgame()