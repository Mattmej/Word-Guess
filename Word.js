var Letter = require("./Letter.js");

/*
Game Plan: Create a Word constructor function.

1. Includes an array of new Letter objects representing the letters of the current word
2. Has a function that concatenates the characters in the letter objects and displays this concatenation.
3. Has a function that takes a character as an argument (comand line!) and calls the second function in Letter.js on each letter object.

----------------------------------------------------

Troubleshooting:

1. Functions can split up letters of a word, but cannot split up a sentence in a way that doesn't include 
    spaces as characters to be guessed.
    A. Attempt 1:
        i. Start with a word / phrase
        ii. Split up the initial word / phrase into words [VARIABLE.split(" ")]
        iii. Take each word in the last array and turn each word into an array of its own.
                Each index contains a letter.

        iv. Take each character in each index of the last array and apply the Letter function to each.
        v. Take each array in (iii) and join their items into a string.
        vi. Join the array in (ii) with spaces between each word.

*/

// NOTE: The word can be a phrase.
function Word(word) {
    // this.letterArray = word.split("");

    // This will hold each word of the phrase.
    this.wordArray = word.split(" ");
    // this.letterArray = [];

    // e.g. word = "This is a sentence"
    // wordArray = ['This', 'is', 'a', 'sentence']
    for (i = 0; i < wordArray.length; i++) {
        wordArray[i] = wordArray[i].split("");
        // now wordArray = [ [T,h,i,s] , [i,s], [a], [s,e,n,t,e,n,c,e] ]
    }

    // Array that will hold the letters of the word
    this.wordLetterArray = [];
    this.guessWord = "";

    // This loop will put the letters of the word into wordArray
    for (i = 0; i < this.letterArray.length; i++) {

        // creates a new Letter object
        var wordLetter = new Letter(this.letterArray[i]);
        wordLetter.displayLetter();
        this.wordLetterArray.push(wordLetter.loggedLetter);
    }

    // Concatenates the characters in the letter objects
    this.wordFromLetters = function(wordLetterArray) {
        this.guessWord = this.wordLetterArray.join(" ");
        console.log(this.guessWord);

        // for (i = 0; i < wordLetterArray.length; i++) {
        //     this.guessWord += wordLetterArray[i];
        //     console.log(this.guessWord);
        // }

    }
}

// Testing stuff
// var newWord = new Word("Banana");
// console.log(newWord.wordLetterArray)
// newWord.wordFromLetters();

var newWord = new Word("This is a sentence")
// console.log(newWord.wordLetterArray);
newWord.wordFromLetters()



// newWord.wordFromLetters();