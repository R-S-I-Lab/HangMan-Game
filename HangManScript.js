let lives = 7;
let word = "";

function getRandomWord() {
    const words = ["ARRAY", "ALGORITHM", "BINARY", "LOOP", "STATEMENT"];
    const index = Math.floor(Math.random() * words.length);
    return words[index];
}

function createInputGroup() {
    const container = document.getElementById("inputGroup");
    const elements = [
        ["div", "class", "input-group mb-3", "id", "inputGroup"],
        ["input", "type", "text", "class", "form-control", "placeholder",
            "Enter letter", "id", "userLetter"],
        ["button", "type", "button", "class", "btn btn-primary", "onclick",
            "checkLetter()", "innerHTML", "Check Letter"],
        ["div", "id", "livesDisplay", "innerText", "Lives " + lives],
        ["div", "style", "font-size:50px", "id", "resultDisplay"]
    ];
    let inputGroup = "";
    for (let i = 0; i < elements.length; i++) {
        const element = document.createElement(elements[i][0]);
        for (let j = 1; j < elements[i].length; j += 2) {
            if (elements[i][j] === "innerHTML") {
                element.innerHTML = elements[i][j + 1];
            } else if (elements[i][j] === "innerText") {
                element.innerText = elements[i][j + 1];
            } else {
                element.setAttribute(elements[i][j], elements[i][j + 1]);
            }
        }
        if (elements[i][0] === "div" && elements[i].includes("input-group mb-3")) {
            inputGroup = element;
            container.appendChild(inputGroup);
        } else if (inputGroup && (elements[i][0] === "input" || elements[i][0] === "button")) {
            inputGroup.appendChild(element);
        } else {
            container.appendChild(element);
        }
    }
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
