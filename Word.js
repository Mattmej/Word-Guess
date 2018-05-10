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

    B. Result of attempt 1: Success!

*/

// NOTE: The word can be a phrase.
function Word(word) {
    // this.letterArray = word.split("");

    // This will hold each word of the phrase.
    // e.g. word = "This is a sentence"
    // wordArray = ['This', 'is', 'a', 'sentence']
    this.wordArray = word.split(" ");
    // this.letterArray = [];

    // will hold each word of the phrase as an array.
    // Each of these smaller arrays will hold the each character of a word as an element.
    this.newWordArray = [];

    // This array will be similar to the newWordArray,
    // but each character will be a new Letter object.
    this.objectWordArray = [];

    // This array will hold the Letter objects' displayLetter loggedLetters (see Letter.js)
    // in preparation for displaying to the console.
    this.loggedWordArray = [];

    // The word (and/or blanks) to be displayed to the console.
    this.displayedWord;

    for (i = 0; i < this.wordArray.length; i++) {
            
        this.newWordArray[i] = this.wordArray[i].split("");
        this.objectWordArray.push([]);
        // now newWordArray = [ [T,h,i,s] , [i,s], [a], [s,e,n,t,e,n,c,e] ]

        for (j = 0; j < this.newWordArray[i].length; j++) {
            var wordLetter = new Letter(this.newWordArray[i][j]);
            wordLetter.displayLetter();
            // this.objectWordArray[i][j] = (wordLetter.loggedLetter);
            this.objectWordArray[i].push(wordLetter);
        }

    }


    this.wordFromLetters = function() {

        // takes each letter in the wordArray sub-arrays and turns those letters into Letter objects.
        // Stores a property of each letter object into the newWordArray
        
        

        this.loggedWordArray[i] = this.objectWordArray[i].join(" ");

        this.displayedWord = this.loggedWordArray.join("   ");
        // console.log(this.newWordArray);
        console.log(this.displayedWord);
    }

        
   

    this.checkUserArgs = function(argument) {
        
        // we will make argument = process.argv[3]

        if (argument.length != 1) {
            console.log("Please enter a single character!");
        }

        else {
            for (i = 0; i < this.objectWordArray.length; i++) {
                this.objectWordArray[i].checkLetter(argument);
                this.wordFromLetters();
            }
        }

        // console.log(argument);

    }
   
}

// Testing stuff
var newWord = new Word("Banana");
// console.log(newWord.wordLetterArray)
// newWord.wordFromLetters();

// var newWord = new Word("This is a sentence")
// console.log(newWord.wordLetterArray);
// newWord.wordFromLetters()

// newWord.checkUserArgs(process.argv[2]);
// console.log(process.argv[2]);

// console.log(newWord.objectWordArray);
// console.log(newWord.newWordArray);