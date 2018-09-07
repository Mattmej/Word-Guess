/* 
Game Plan:

This constructor should be able to either display an underlying character or a blank placeholder (such as an underscore), 
depending on whether or not the user has guessed the letter. That means the constructor should define:

* A string value to store the underlying character for the letter
* A boolean value that stores whether that letter has been guessed yet
* A function that returns the underlying character if the letter has been guessed, 
    or a placeholder (like an underscore) if the letter has not been guessed
* A function that takes a character as an argument and checks it against the underlying character, 
    updating the stored boolean value to true if it was guessed correctly

-------------------------------------------------------------------------------------------------------------------------------------

1. Create "Letter" constructor function
    a. Accept a letter as an input
    b. Has a boolean value that says whether the letter has been correctly guessed yet.
    c. If/else function
        i. If the letter is guessed correctly, then prints/displays the inputted letter
        ii. If the letter is incorrectly guessed, then prints/displays an underscore.
    d. A "checking" function to check a guessed character
        i. Takes in a character as an argument
        ii. Checks this inputted character against the original letter inputted into the Letter function
        iii. If guessed correctly, update boolean value to true.

2. Make the "Letter" function exportable.

*/


// Constructor function for a "Letter" object
function Letter(letter) {

    // This variable reads whether or not the letter object has been guessed correctly.
    this.guessCorrect = false;

    // This variable stores the character that will be displayed to the console.
    this.loggedLetter;

    // This function will either display a letter or a blank to the console.
    this.displayLetter = function() {

        // If this letter was guessed correctly, then...
        if (this.guessCorrect === true) {

            // A letter will be displayed to the console.
            this.loggedLetter = letter;
            // console.log(letter);
        }

        // If the letter was NOT guessed correctly, then...
        else {

            // A blank will be displayed to the console.
            this.loggedLetter = "_";
            // console.log("_");
        }
    }

    // This function will check if the user's guess was a correct guess.
    this.checkLetter = function(guess) {

        // If the user's guess matches the letter object
        if (guess === letter) {

            // Sets guessCorrect to true
            this.guessCorrect = true;
            // console.log(this.guessCorrect);
        }

    }

}

// Allows the Letter constructor function to be exported.
module.exports = Letter;

