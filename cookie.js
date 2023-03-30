// let cookie = document.getElementById('cookie')
let characterList = document.querySelectorAll('.cookie-list')
let characterElement = document.createElement('div')
characterElement.setAttribute('id', 'character')
let cookie = characterElement
let selectedCharacter = null
let scoreHit = document.getElementById('clicker__counter')
let speed = document.getElementById('clicker__speed')
let num = 0
let timeLeft = new Date().getTime()
let scoreTime = 0
let shake = document.getElementById('shake')
let flip = document.getElementById('flip')
let jello = document.getElementById('jello')
let rubber = document.getElementById('rubber')
let bounceInRight = document.getElementById('bounceInRight')
let startBtn = document.querySelector('#start')
let screens = document.querySelectorAll('.screen')
let timeList = document.querySelector('#time-list')
let time = document.getElementById('time')
time = 0
let timeEl = document.querySelector('#time')
let board = document.querySelector('#board')
let score = 0
let reset = document.querySelector('#reset')
let intervalId
let audio = new Audio("https://www.fesliyanstudios.com/play-mp3/11");
let audioClick = new Audio("https://www.fesliyanstudios.com/play-mp3/7756");
let buttons = document.querySelectorAll(".btns");



function changeSize() {
    cookie.classList.toggle('changesize')
    num++
    scoreHit.textContent = ` ${num}`

    let newTime = new Date().getTime()
    let clickTime = (newTime - startTime) / 1000
    scoreTime = num / clickTime
    speed.textContent = ` ${scoreTime.toFixed(2)} кликов в секунду`

}

cookie.addEventListener('click', changeSize)

jello.addEventListener('mouseover', jelled)
jello.addEventListener('mouseout', jelledOut)
jello.addEventListener('click', targetCharacter)
shake.addEventListener('mouseover', shaked)
shake.addEventListener('mouseout', shakedOut)
shake.addEventListener('click', targetCharacter)
flip.addEventListener('mouseover', flipeed)
flip.addEventListener('mouseout', flipeedOut)
flip.addEventListener('click', targetCharacter)
rubber.addEventListener('mouseover', rubbered)
rubber.addEventListener('mouseout', rubberedOut)
rubber.addEventListener('click', targetCharacter)
bounceInRight.addEventListener('mouseover', bounceInRighted)
bounceInRight.addEventListener('mouseout', bounceInRightedOut)
bounceInRight.addEventListener('click', targetCharacter)

function jelled() {
    jello.classList.add('animate__flip')
    jello.classList.add('characterBox')
}
function jelledOut() {
    jello.classList.remove('animate__flip')
    jello.classList.remove('characterBox')
}
function shaked() {
    shake.classList.add('animate__shakeY')
    shake.classList.add('characterBox')
}
function shakedOut() {
    shake.classList.remove('animate__shakeY')
    shake.classList.remove('characterBox')
}
function flipeed() {
    flip.classList.add('animate__flip')
    flip.classList.add('characterBox')
}
function flipeedOut() {
    flip.classList.remove('animate__flip')
    flip.classList.remove('characterBox')
}
function rubbered() {
    rubber.classList.add('animate__rubberBand')
    rubber.classList.add('characterBox')
}
function rubberedOut() {
    rubber.classList.remove('animate__rubberBand')
    rubber.classList.remove('characterBox')
}
function bounceInRighted() {
    bounceInRight.classList.add('animate__flip')
    bounceInRight.classList.add('characterBox')
}
function bounceInRightedOut() {
    bounceInRight.classList.remove('animate__flip')
    bounceInRight.classList.remove('characterBox')
}

function targetCharacter() {
    let characters = document.querySelectorAll('.cookie-list');

    characters.forEach((character) => {
        character.addEventListener('click', () => {
            characters.forEach((char) => {
                char.classList.remove('characterBoxTarget');
            });
            character.classList.add('characterBoxTarget');
            character.classList.add('characterBoxTarget:after');
        });
    });
}


characterList.forEach((character) => {
    character.addEventListener('click', () => {
        selectedCharacter = character.querySelector('img');
    });
});

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    if (selectedCharacter && selectedCharacter.parentElement.classList.contains('characterBoxTarget')) {
        screens[0].classList.add('up');
    }
    else {
        alert('Выберите персонажа')
    }
   
    


})



timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

reset.addEventListener('click', (event) => {
    event.preventDefault()
    startOver()
})

function startOver() {
    time = 0
    score = 0
    num = 0
    speed.innerHTML = ''
    scoreHit.innerHTML = ''
    timeEl.parentNode.classList.remove('hide')
    reset.classList.remove('reset-active')
    screens[1].classList.remove('up');
    screens[0].classList.add('up');
    board.innerHTML = ''
    clearInterval(intervalId)
    startTime = 0
    timeEl.classList.remove('color')

    if (selectedCharacter) {
        selectedCharacter.remove();
        selectedCharacter = null;
    }
    if (characterElement.contains(selectedCharacter)) {
        characterElement.removeChild(selectedCharacter);
    }
    board.removeChild(characterElement);
}



function startGame() {
    intervalId = setInterval(decreaseTime, 1000)
    startTime = new Date().getTime()
    setTime(time)
    if (selectedCharacter) {
        let selectedCharacterCopy = selectedCharacter.cloneNode()
        selectedCharacterCopy.setAttribute('id', 'selected-character')
        characterElement.appendChild(selectedCharacterCopy)
        board.appendChild(characterElement)
        
        
    }

 
    selectedCharacter = document.createElement('img')
    selectedCharacter.setAttribute('src', `images/character${num}.png`)
    selectedCharacter.setAttribute('alt', 'selected character')
    selectedCharacter.classList.add('selected-character')
    board.appendChild(characterElement)
}


function decreaseTime() {
    if (time === 0) {
        finishGame()
    }
    else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
            if (current < 5) {
                timeEl.classList.add('color')
            }
        }
        setTime(current)
    }
}



function setTime(value) {
    timeEl.textContent = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>  <span class="clicker__status">Всего кликов ${num} <br> Кликов в секунду ${scoreTime.toFixed(4)} </span></h1>`
    board.after(reset)
    reset.classList.add('reset-active')
    
    if (scoreTime > 5) {
        board.innerHTML = `<h1 class="cookie-list">Ты почти Бог игры! Твой результат лучше, чем у 98% пользователей </h1>`
    }
    else if (scoreTime > 4) {
        board.innerHTML = `<h1 class="cookie-list"> Ты почти мастер игры! Твой результат лучше, чем у 85% пользователей </h1>`
    }
    else if (scoreTime > 3) {
        board.innerHTML = `<h1 class="cookie-list"> Грандиозно! Твой результат лучше, чем у  75% пользователей </h1>`
    }
    else if (scoreTime > 2) {
        board.innerHTML = `<h1 class="cookie-list"> Отлично! Твой результат лучше, чем у 65% пользователей </h1>`
    }
    else if (scoreTime > 1) {
        board.innerHTML = `<h1 class="cookie-list"> Хорошо! Но, ты можешь лучше. Твой результат лучше, чем у 50% пользователей </h1>`
    }
    else if (scoreTime > 0.5) {
        board.innerHTML = `<h1 class="cookie-list"> Тренируйся еще! Твой результат лучше, чем у 10% пользователей</h1>`
    }
    else if (scoreTime <= 0.5) {
        board.innerHTML = `<h1 class="cookie-list"> Тренируйся еще! Твой результат лучше, чем у 2% пользователей</h1>`
    }

}


buttons.forEach(buttons => {
    buttons.addEventListener("click", () => {
        audio.play();
    });
});

cookie.addEventListener('click', () => {
    audioClick.currentTime = 0;
    audioClick.play()
})



let elementsToDelete = []

cookie.addEventListener('click', () => {
    let circle = document.createElement('div');
    let size = getRandomNumber(5, 10);
    let { width, height } = board.getBoundingClientRect();

    let xMin = width - 150
    let xMax = width - size
    let yMin = 20
    let yMax = height / 2 - size / 2

    let x = getRandomNumber(xMin, xMax);
    let y = getRandomNumber(yMin, yMax);

    circle.classList.add('circle');
    circle.textContent = '+1';
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    board.appendChild(circle);
    elementsToDelete.push(circle);

    setTimeout(() => {
        board.removeChild(circle);
        elementsToDelete = elementsToDelete.filter((el) => el !== circle);
    }, 1000);
});

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

