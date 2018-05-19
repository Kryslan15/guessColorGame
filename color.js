'use strict';

let colorsList;
let pickedColor;
let colors;
let colorKeys;
let container = document.querySelector("#container");
let colorDisplay = document.querySelector("#colorDisplay");
let h1 = document.querySelector("h1");
let messageDisplay = document.querySelector("#message");
let numSquares = 6;
let newGame = document.querySelector("#newGame");
let squares = [];


/* Load the JSON with the list of colors */
let loadJSON = (callback => {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'colors.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == 200) {
            callback(xobj.responseText);
        }
    }
    xobj.send(null);
});

/* Set the difficulty mode level buttons*/
let setModeButtons = () => {
    let modeButtons = document.querySelectorAll(".mode");
    for(let i=0; i<modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            modeButtons[2].classList.remove("selected");
            this.classList.add("selected");
            switch(this.textContent) {
                case "Easy": numSquares = 3;
                break;
                case "Medium": numSquares = 6;
                break;
                case "Hard": numSquares = 9;
                break
            }
            reset();
        });
    }
}

/*Generate "n" number of squares based on the difficulty level*/
let setSquares = () => {
    let squareDiv;
    squares = [];
    container.innerHTML = "";
    for(let i = 0; i<numSquares; i += 1) {
        squareDiv = document.createElement("div");
        squareDiv.classList.add("square");
        squareDiv.style.background = colorsList[colors[i]];
        squares.push(squareDiv);
        container.append(squareDiv);
        squareDiv.addEventListener("click", function() {
            var clickedColor = this.style.background;
            if(clickedColor === colorsList[pickedColor]) {
                changedColors(clickedColor);
            } else {
                this.style.background = "#222222";
                messageDisplay.textContent = "Oops! Try Again!";
            }
        });
    }
}

/*Reset the game*/
let reset = () => {
    colors = generateRandomColors(numSquares);
    pickedColor = colors[Math.floor(Math.random() * numSquares)];
    colorDisplay.textContent = pickedColor;
    h1.style.background = "teal";
    messageDisplay.textContent = "";
    newGame.textContent = "New Game";
    setSquares();
}

/*Return a random color key from the json object*/
let randomColor = () => {
    return colorKeys[Math.floor(Math.random() * colorKeys.length)];
};

/*Generate the array of size 'n' with random color keys*/
let generateRandomColors = (num => {
    let arr = [];
    let randColor;
    while(arr.length < num){
        randColor = randomColor();
        if(arr.indexOf(randColor) == -1) {
            arr.push(randColor);
        }
    }
    return arr;
});

/*Change the colors of all squares to the picked color on correct choice*/
let changedColors = (clickedColor => {
    for(let i = 0; i<colors.length; i += 1) {
        squares[i].style.background = clickedColor;
    }
    messageDisplay.textContent = "Correct";
    h1.style.background = clickedColor;
    newGame.textContent = "Play Again?";
});

newGame.addEventListener("click", () => reset());

/*Initialize the game*/
let init = () => {
    setModeButtons();
    loadJSON(function(response) {
        colorsList = JSON.parse(response);
        colorKeys = Object.keys(colorsList);
        reset();
    });
}

init();




