let displayCurrentGuess = document.getElementById("currentGuess")
let vault = document.getElementById("vault")
let oneBtn = document.getElementById("one")
let twoBtn = document.getElementById("two")
let threeBtn = document.getElementById("three")
let clear = document.getElementById("clear")
let timer = document.getElementById("timer")
let clock = document.getElementById("clock")
let hint = document.getElementById("hint")

let randomDigit1 = Math.floor(Math.random() * 3 + 1)
let randomDigit2 = Math.floor(Math.random() * 3 + 1)
let randomDigit3 = Math.floor(Math.random() * 3 + 1)
let randomNum = `${randomDigit1}${randomDigit2}${randomDigit3}`

let isWin = false
let isLose = false

// initialize guessesLeft
let guessesLeft = 7
clock.textContent = guessesLeft

// when the 1, 2, 3 buttons are clicked, it will append its corresponding number to the currentGuess element
oneBtn.addEventListener("click", function() {
    appendNum(1)
})

twoBtn.addEventListener("click", function() {
    appendNum(2)
})

threeBtn.addEventListener("click", function() {
    appendNum(3)
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
        isWin = true
        let winMessage = document.createElement("p")
        winMessage.textContent = "You win!"
        hint.append(winMessage) // append the message to the end of the log
    } else {
        guessesLeft--
        timerMoving(guessesLeft)
        clock.textContent = guessesLeft

        // if there are 0 guess left, then the user loses
        if (guessesLeft == 0) {
            let loseMessage = document.createElement("p")
            loseMessage.textContent = "You lose!"
            hint.append(loseMessage)
            isLose = true
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
    console.log(randomNum)
}

// countdown
function timerMoving(guessesLeft) {
    // evenly divide the circle to 7 pieces
    let percent = 100 - ((guessesLeft/7) * 100) + "%"
    // turn 1/7 of the circle gray every time the user guesses it wrong
    timer.setAttribute("style", "background: conic-gradient(#7e7e7e 0 " + percent + ", #FBFAF5 " + percent)
}

console.log(randomNum)