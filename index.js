var inquirer = require("inquirer");
var Letter = require("./Letter.js");
var Word = require("./Word.js");

var wordList = ["sesquipedalian", "harmonious", "hot dog on a stick", "cowboy", "hereafter"];

var tries = 10;

var currentWord;
var randIndex;

// var randNum = Math.floor(Math.random * 10) => Random number from 0 to 9.

// a random index of wordList:

function chooseNewWord() {

    randIndex = Math.floor(Math.random() * wordList.length);
    // console.log(randIndex);

    currentWord = new Word(wordList[randIndex]);

    askLetter();

}

chooseNewWord();




// var guessString = "";

function askLetter() {

    if (tries === 0) {
        console.log("You Lose!");
        // return;
        process.exit();
    }

    console.log(tries);

    // Asks the user for input...
    inquirer.prompt([
        {
            type: "input",
            message: "Guess a letter!",
            name: "userGuess",
            // validate: function

        },
    ])

    // ...then performs the following:
    .then (function(response) {

        tries--;
        currentWord.checkUserArgs(response.userGuess);
        // askLetter();
        // guessString = currentWord.displayedWord;

        if (currentWord.displayedWord === wordList[randIndex]) {
            console.log("You Win!");
            chooseNewWord();
        }

        else {
            askLetter();
        }


    });

}



function charOnly(userGuess) {
    if (userGuess.length = 0 || userGuess.length > 1) {
        return "Please enter a single character!";
    }
}

