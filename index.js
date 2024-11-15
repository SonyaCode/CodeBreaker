let displayCurrentGuess = document.getElementById("currentGuess")
let vault = document.getElementById("vault")
let oneBtn = document.getElementById("one")
let twoBtn = document.getElementById("two")
let threeBtn = document.getElementById("three")
let clear = document.getElementById("clear")
let timer = document.getElementById("timer")
let clock = document.getElementById("clock")
let hint = document.getElementById("hint")
let missionOperation = document.getElementById("missionOperation")
let background = document.getElementById("background")

let randomDigit1 = Math.floor(Math.random() * 3 + 1)
let randomDigit2 = Math.floor(Math.random() * 3 + 1)
let randomDigit3 = Math.floor(Math.random() * 3 + 1)
let randomNum = `${randomDigit1}${randomDigit2}${randomDigit3}`

let isWin = false
let isLose = false

// localStorage that stores how many time the player wins
let numOfSuccess = 0


if (localStorage.getItem("numOfSuccess")) {
    numOfSuccess = localStorage.getItem("numOfSuccess")
} else {
    localStorage.setItem("numOfSuccess", numOfSuccess)
}

missionOperation.textContent = "Number of successful mission operation: " + numOfSuccess

// initialize guessesLeft
let guessesLeft = 7
clock.textContent = guessesLeft


// when the 1, 2, 3 buttons are clicked, it will append its corresponding number to the currentGuess element
oneBtn.addEventListener("click", function() {
    if (!isWin || !isLose) {
        appendNum(1)
    }
})


twoBtn.addEventListener("click", function() {
    if (!isWin || !isLose) {
        appendNum(2)
    }
})


threeBtn.addEventListener("click", function() {
    if (!isWin || !isLose) {
        appendNum(3)
    }
})


function appendNum(num) {
    if (displayCurrentGuess.textContent.length < 3) {
        displayCurrentGuess.append(num)
    }
   
    if (displayCurrentGuess.textContent.length == 3) {
        matchGuess()
    }
   
}


// when the clear button is clicked, it will clear the content in the currentGuess element
clear.addEventListener("click", function() {
    if (isWin || isLose) {
        reset()
    } else {
        displayCurrentGuess.textContent = ""
    }
   
})


function matchGuess() {
    if (displayCurrentGuess.textContent == randomNum) {
        if (!isWin) {
            isWin = true
            numOfSuccess++
            let winMessage = document.createElement("p")
            winMessage.textContent = "You win! Click clear to play again!"
            hint.append(winMessage) // append the message to the end of the log
        }


        missionOperation.textContent = "Number of successful mission operation: " + numOfSuccess
        localStorage.setItem("numOfSuccess", numOfSuccess) // save to localStorage
        // cash background
        background.setAttribute("style", "background-image: url('https://wallpapercave.com/wp/wp1949062.jpg')")
    } else {
        if (!isLose) {
            guessesLeft--
            timerMoving(guessesLeft)
            clock.textContent = guessesLeft
        }
        

        // if there are 0 guess left, then the user loses
        if (guessesLeft == 0) {
            if (!isLose) {
                isLose = true
                let loseMessage = document.createElement("p")
                loseMessage.textContent = "You lose! Click clear to play again!"
                hint.append(loseMessage)
            }
            // police car background
            background.setAttribute("style", "background-image: url('https://conduciendo.com/wp-content/uploads/2017/10/15367.jpg')")
        } else {
            // parse displayCurrentGuess and randomNum into integer instead of string
            let displayCurrentGuessInt = parseInt(displayCurrentGuess.textContent)
            let randomNumInt = parseInt(randomNum)


            if (displayCurrentGuessInt > randomNumInt) {
                let tooHigh = document.createElement("p")
                tooHigh.textContent = displayCurrentGuessInt + " is too high!"
                hint.append(tooHigh)
            } else {
                let tooLow = document.createElement("p")
                tooLow.textContent = displayCurrentGuessInt + " is too low!"
                hint.append(tooLow)
            }
        }


        displayCurrentGuess.textContent = ""
       
    }
}


function reset() {
    guessesLeft = 7
    clock.textContent = guessesLeft
    displayCurrentGuess.textContent = ""
    hint.textContent = ""
    randomDigit1 = Math.floor(Math.random() * 3 + 1)
    randomDigit2 = Math.floor(Math.random() * 3 + 1)
    randomDigit3 = Math.floor(Math.random() * 3 + 1)
    randomNum = `${randomDigit1}${randomDigit2}${randomDigit3}`
    isWin = false
    isLose = false
    timer.removeAttribute("style")
    background.removeAttribute("style")
}


// countdown
function timerMoving(guessesLeft) {
    // evenly divide the circle to 7 pieces
    let percent = 100 - ((guessesLeft/7) * 100) + "%"
    // turn 1/7 of the circle gray every time the user guesses it wrong
    // Source: https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient
    timer.setAttribute("style", "background: conic-gradient(#7e7e7e 0 " + percent + ", #FBFAF5 " + percent)
}


// console.log(randomNum)