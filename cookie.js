let cookie = document.getElementById('cookie')
let score = document.getElementById('clicker__counter')
let speed = document.getElementById('clicker__speed')
let num = 0
let time = new Date().getTime()
let scoreTime = 0



    function changeSize(){
    cookie.classList.toggle('changesize')
    num ++
    score.textContent = ` ${num}`

    let newTime = new Date().getTime()
    let clickTime = (newTime - time) / 1000 
    scoreTime = num / clickTime
    speed.textContent = ` ${scoreTime.toFixed(4)} кликов в секунду`
} 
cookie.onclick = changeSize





