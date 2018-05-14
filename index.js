// Link to inquirer node package
var inquirer = require("inquirer");

// Link to Letter.js file
var Letter = require("./Letter.js");

// Link to Word.js file
var Word = require("./Word.js");

// These are the words/phrases that are picked at random for the user to guess.
var wordList = ["sesquipedalian", "harmonious", "hot dog on a stick", "cowboy", "hereafter", "pyrite", "echolocation", "cacophony", "alternative", "an apple a day"];

// This variable will hold the number of tries the user has to guess the word or phrase.
var tries;

// This variable will hold whichever word was randomly picked for the user to guess.
var currentWord;

// This variable will hold a random index number.
var randIndex;

// var randNum = Math.floor(Math.random * 10) => Random number from 0 to 9.



// This function will randomly choose a word from the wordList for the user to guess.
function chooseNewWord() {

    // Sets randIndex to a random number between 0 and the length of the wordList array.
    randIndex = Math.floor(Math.random() * wordList.length);
    // console.log(randIndex);

    // Sets currentWord to a random word in the wordList
    currentWord = new Word(wordList[randIndex]);

    // The number of tries the user has is equal to the number of characters in the word/phrase plus three.
    tries = wordList[randIndex].length + 3;

    // Displays the current word's blanks and/or letters to the console.
    currentWord.wordFromLetters();

    // Asks the user to enter a letter.
    askLetter();

}

// Runs this function
chooseNewWord();




// var guessString = "";

// This is the function that will ask the user to enter a letter.
function askLetter() {

    // If the user has no more tries, then they lose.
    if (tries === 0) {
        console.log("\nYou Lose!");

        // Displays the correct word or phrase to the console.
        console.log("Correct Word/Phrase: " + wordList[randIndex] + "\n");

        // Asks the user if they want to play again.
        playAgain();

    }

    // But if the user still has tries, then...
    else {

        // Displays the remaining number of tries
        console.log("\nNumber of tries left: " + tries);

        // Displays the letters that the user has already guessed
        console.log("Guessed Letters: " + currentWord.guessedLetters.join(", ") + "\n");

        // Asks the user for input...
        inquirer.prompt([
            {
                type: "input",
                message: "Guess a letter!",
                name: "userGuess",
            },
        ])

        // ...then performs the following:
        .then (function(response) {

            // If the user enters a single character that has not already been guessed, then the # of tries goes down by 1.
            if (response.userGuess.length === 1 && !currentWord.guessedLetters.includes(response.userGuess)) {
                tries--;
            }

            // This function checks each Letter object against the argument.
            currentWord.checkUserArgs(response.userGuess);
            
            // If the user has guessed all the letters in the current word, then...
            if (currentWord.displayedWord === wordList[randIndex].split("").join(" ")) {

                // User wins
                console.log("\nYou Win!");

                // Asks the user if they want to play again.
                playAgain();

            }

            // If the user still has letters to guess, then the askLetter function will run again.
            else {
                askLetter();
            }

        });
    }
}

// Asks the user if they want to play again.
function playAgain() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Play Again?",
            name: "answer"
        }

    ])
    .then (function(response) {

        // If the player answered "yes," then...
        if (response.answer === true) {

            // This function will randomly choose a word from the wordList for the user to guess.
            chooseNewWord();
        }

        // If the player answered "no,", then...
        else {

            // Ends the application.
            process.exit();
        }
    })

}

