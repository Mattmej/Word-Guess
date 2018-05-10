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

    this.objectWordArray2 = [];

    // This array will hold the Letter objects' displayLetter loggedLetters (see Letter.js)
    // in preparation for displaying to the console.
    this.loggedWordArray = [];

    // The word (and/or blanks) to be displayed to the console.
    this.displayedWord;

    // loops through each word of the phrase
    for (i = 0; i < this.wordArray.length; i++) {
            
        this.newWordArray[i] = this.wordArray[i].split("");
        this.objectWordArray.push([]);
        // now newWordArray = [ [T,h,i,s] , [i,s], [a], [s,e,n,t,e,n,c,e] ]

        // loops through each letter of each word
        for (j = 0; j < this.newWordArray[i].length; j++) {
            var wordLetter = new Letter(this.newWordArray[i][j]);
            // wordLetter.displayLetter();
            // this.objectWordArray[i][j] = (wordLetter.loggedLetter);
            this.objectWordArray[i].push(wordLetter);
        }

    }


    this.wordFromLetters = function() {

        // takes each letter in the wordArray sub-arrays and turns those letters into Letter objects.
        // Stores a property of each letter object into the newWordArray
        
        for (i = 0; i < this.objectWordArray.length; i++) {

            // pushes a new array into this objectWordArray2
            this.objectWordArray2.push([]);

            for (j = 0; j < this.objectWordArray[i].length; j++) {
                // var tempLetter = this.objectWordArray[i][j].displayLetter();
                this.objectWordArray[i][j].displayLetter();

                // holds the loggedLetter property of the Letter object (letter to be displayed)
                var tempLetter = this.objectWordArray[i][j].loggedLetter;

                // puts the loggedLetter property of the Letter object into an array of the objectWordArray2
                this.objectWordArray2[i].push(tempLetter)
            }

            // loggedWordArray consists of a number of strings that equal the words of the phrase to be guessed.
            // These strings will contain characters, blanks, or both.
            // e.g. ['t _ _ _', '_ _', '_', '_ _ _ t _ _ _ _']
            this.loggedWordArray[i] = this.objectWordArray2[i].join(" ");

        }

        // console.log(this.loggedWordArray);

        // displayedWord will take the blanks and concatenate them into one big string.
        // e.g. t _ _ _   _ _   _   _ _ _ t _ _ _ _
        this.displayedWord = this.loggedWordArray.join("   ");
        // // console.log(this.newWordArray);
        console.log(this.displayedWord);
        // console.log(this.objectWordArray2);
    }

        
   

    this.checkUserArgs = function(argument) {
        
        // we will make argument = process.argv[3]

        if (argument.length != 1) {
            console.log("Please enter a single character!");
        }

        else {
            for (i = 0; i < this.objectWordArray.length; i++) {

                for (j = 0; j < this.objectWordArray[i].length; j++) {

                    this.objectWordArray[i][j].checkLetter(argument);

                }
                
            }

            this.wordFromLetters();
        }

        // console.log(argument);

    }
   
}

// Testing stuff
// var newWord = new Word("Banana");
// console.log(newWord.wordLetterArray)
// newWord.wordFromLetters();

var newWord = new Word("This is a sentence")
// console.log(newWord.wordLetterArray);
// newWord.wordFromLetters()

newWord.checkUserArgs(process.argv[2]);
// console.log(process.argv[2]);

// console.log(newWord.objectWordArray[1]);
// console.log(newWord.objectWordArray[0]);
// console.log(newWord.newWordArray);