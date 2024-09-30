let lives = 7;
let word = "";

function getRandomWord() {
    const words = ["ARRAY", "ALGORITHM", "BINARY", "LOOP", "STATEMENT"];
    const index = Math.floor(Math.random() * words.length);
    return words[index];
}

function addAttributes(element, attributes) {
    for (let i = 0; i < attributes.length; i += 2) {
        element.setAttribute(attributes[i], attributes[i + 1]);
    }
    return element;
}

function createInputGroup() {
    const container = document.getElementById("inputGroup");
    const groupAttributes = ["class", "input-group mb-3", "id", "inputGroup"];
    let inputGroup = document.createElement("div");
    inputGroup = addAttributes(inputGroup, groupAttributes);
    container.appendChild(inputGroup);
    const inputAttributes = ["type", "text", "class", "form-control",
        "placeholder", "Enter letter", "id", "userLetter"];
    let input = document.createElement("input");
    input = addAttributes(input, inputAttributes);
    inputGroup.appendChild(input);
    const buttonAttributes = ["type", "button", "class", "btn btn-primary",
        "onclick", "checkLetter()"];
    let button = document.createElement("button");
    button.innerHTML = "Check Letter";
    button = addAttributes(button, buttonAttributes);
    inputGroup.appendChild(button);
    const livesAttributes = ["id", "livesDisplay"];
    let noLives = document.createElement("div");
    noLives.innerText = "Lives " + lives;
    noLives = addAttributes(noLives, livesAttributes);
    container.appendChild(noLives);
    const resultAttributes = ["style", "font-size:50px", "id", "resultDisplay"];
    let resultDisplay = document.createElement("div");
    resultDisplay = addAttributes(resultDisplay, resultAttributes);
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

function checkGameStatus(letters) {
    let allGuessed = true;
    for (let i = 0; i < letters.length && allGuessed; ++i) {
        if (letters[i].innerHTML === " _ ") {
            allGuessed = false;
        }
    }
    if (allGuessed) {
        document.getElementById("resultDisplay").innerText
            = "Congratulations! You've guessed the word: " + word;
    } else if (lives === 0) {
        document.getElementById("resultDisplay").innerText
            = "Game Over! The word was: " + word;
    }
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
    checkGameStatus(letters);
}
