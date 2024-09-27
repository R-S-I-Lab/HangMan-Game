let lives = 7;
let word = "";

function getRandomWord() {
    const words = ["ARRAY", "ALGORITHM", "BINARY", "LOOP", "STATEMENT"];
    const index = Math.floor(Math.random() * words.length);
    return words[index];
}

function createInputGroup() {
    const container = document.getElementById("inputGroup");
    const inputGroup = document.createElement("div");
    inputGroup.setAttribute("class", "input-group mb-3");
    inputGroup.setAttribute("id", "inputGroup");
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("class", "form-control");
    input.setAttribute("placeholder", "Enter letter");
    input.setAttribute("id", "userLetter");
    inputGroup.appendChild(input);
    const button = document.createElement("button");
    button.innerHTML = "Check Letter";
    button.setAttribute("type", "button");
    button.setAttribute("class", "btn btn-primary");
    button.setAttribute("onclick", "checkLetter()");
    inputGroup.appendChild(button);
    container.appendChild(inputGroup);
    const noLives = document.createElement("div");
    noLives.innerText = "Lives " + lives;
    noLives.setAttribute("id", "livesDisplay");
    container.appendChild(noLives);
    const resultDisplay = document.createElement("div");
    resultDisplay.setAttribute("style", "font-size:50px");
    resultDisplay.setAttribute("id", "resultDisplay");
    container.appendChild(resultDisplay);
}

function startGame() {
    const container = document.getElementById("createHere");
    word = getRandomWord();
    for (let i = 0; i < word.length; ++i) {
        const span = document.createElement("span");
        span.innerHTML = " _ ";
        span.setAttribute("id", word[i]);
        container.appendChild(span);
    }
    createInputGroup();
}

function checkLetter() {
    const letters = document.getElementsByTagName("span");
    const letter = document.getElementById("userLetter").value.toUpperCase();
    let exist = false;
    for (let i = 0; i < letters.length; ++i) {
        if (letter === letters[i].id) {
            letters[i].innerHTML = letter;
            exist = true;
        }
    }
    document.getElementById("userLetter").value = "";
    if (!exist) {
        --lives;
        document.getElementById("livesDisplay").innerText = "Lives  " + lives;
    }
    if (lives === 0) {
        document.getElementById("resultDisplay").innerText = "Game Over! The word was: " + word;
    }
    let allGuessed = true;
    for (let i = 0; i < letters.length && allGuessed; ++i) {
        if (letters[i].innerHTML === " _ ") {
            allGuessed = false;
        }
    }
    if (allGuessed) {
        document.getElementById("resultDisplay").innerText = "Congratulations! You've guessed the word: " + word;
    }
}