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



function Letter(letter) {

    this.guessCorrect = false;

    this.displayLetter = function() {
        if (this.guessCorrect === true) {
            console.log(letter);
        }

        else {
            console.log("_");
        }
    }

    this.checkLetter = function(guess) {
        if (guess === letter) {
            this.guessCorrect = true;
            console.log(this.guessCorrect);
        }
    }

}

// Letter("Johnny");

var char1 = new Letter("J");

char1.checkLetter("J");
char1.displayLetter();

// Letter("J").checkLetter("J");