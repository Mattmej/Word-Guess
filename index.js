var inquirer = require("inquirer");
var Letter = require("./Letter.js");
var Word = require("./Word.js");

var wordList = ["sesquipedalian", "harmonious", "hot dog on a stick", "cowboy", "hereafter"];

// var randNum = Math.floor(Math.random * 10) => Random number from 0 to 9.

// a random index of wordList:
var randIndex = Math.floor(Math.random * wordList.length);

var currentWord = new Word(wordList[randIndex]);

var tries = 10;

// var guessString = "";

function askLetter() {

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

        currentWord.checkUserArgs(response.userGuess);
        // guessString = currentWord.displayedWord;



    });

}



function charOnly(userGuess) {
    if (userGuess.length = 0 || userGuess.length > 1) {
        return "Please enter a single character!";
    }
}

