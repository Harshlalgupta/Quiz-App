const highscoreslist=document.querySelector('#highscoreslist')
const highscore=JSON.parse(localStorage.getItem('highscores')) || []

highscoreslist.innerHTML=
highscore.map(score => {
    return `<li class="high-score"> ${score.name} - ${score.score} </li>`
}).join('')