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
    // e.g. word = "This is a sentence"
    // wordArray = ['This', 'is', 'a', 'sentence']
    this.wordArray = word.split(" ");
    // this.letterArray = [];

    this.newWordArray = [];
    this.displayedWord;

    this.wordFromLetters = function() {

        // takes each letter in the wordArray sub-arrays and turns those letters into Letter objects.
        // Stores a property of each letter object into the newWordArray
        for (i = 0; i < this.wordArray.length; i++) {
            this.wordArray[i] = this.wordArray[i].split("");
            this.newWordArray.push(this.wordArray[i]);
            // now wordArray = [ [T,h,i,s] , [i,s], [a], [s,e,n,t,e,n,c,e] ]

            for (j = 0; j < this.wordArray[i].length; j++) {
                var wordLetter = new Letter(this.wordArray[i][j]);
                wordLetter.displayLetter();
                this.newWordArray[i][j] = (wordLetter.loggedLetter);

            }

            this.newWordArray[i] = this.newWordArray[i].join(" ");
        }

        this.displayedWord = this.newWordArray.join("   ");
        // console.log(this.newWordArray);
        console.log(this.displayedWord);
        
    }

    // // Array that will hold the letters of the word
    // this.wordLetterArray = [];
    // this.guessWord = "";

























//     // This loop will put the letters of the word into wordArray
//     for (i = 0; i < this.letterArray.length; i++) {

//         // creates a new Letter object
//         var wordLetter = new Letter(this.letterArray[i]);
//         wordLetter.displayLetter();
//         this.wordLetterArray.push(wordLetter.loggedLetter);
//     }

//     // Concatenates the characters in the letter objects
//     this.wordFromLetters = function(wordLetterArray) {
//         this.guessWord = this.wordLetterArray.join(" ");
//         console.log(this.guessWord);

//         // for (i = 0; i < wordLetterArray.length; i++) {
//         //     this.guessWord += wordLetterArray[i];
//         //     console.log(this.guessWord);
//         // }

//     }
// }
}

// Testing stuff
// var newWord = new Word("Banana");
// console.log(newWord.wordLetterArray)
// newWord.wordFromLetters();

var newWord = new Word("This is a sentence")
// console.log(newWord.wordLetterArray);
newWord.wordFromLetters()



// newWord.wordFromLetters();