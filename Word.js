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

    // This will hold each word of the phrase.
    // e.g. word = "This is a sentence"
    // wordArray = ['This', 'is', 'a', 'sentence']
    this.wordArray = word.split(" ");

    // will hold each word of the phrase as an array.
    // Each of these smaller arrays will hold each character of a word as an element.
    // e.g. word = "This is a sentence"
    // newWordArray = [ [T,h,i,s] , [i,s] , [a] , [s,e,n,t,e,n,c,e] ]
    this.newWordArray = [];

    // This array will be similar to the newWordArray,
    // but each character will be a new Letter object.
    // e.g. word = "This is a sentence"
    // objectWordArray = [ [{obj},{obj},{obj},{obj}] , [{obj},{obj}] , [{obj}] , [{obj},{obj},{obj},{obj},{obj},{obj},{obj},{obj}] ]
    this.objectWordArray = [];

    // This array will hold the Letter objects' displayLetter loggedLetters (see Letter.js)
    // in preparation for displaying to the console.
    // e.g. word = "This is a sentence" and userGuess = 's'
    // loggedWordArray = [ [_, _, _, s] , [_, s] , [_] , [s, _, _, _, _, _, _, _] ]
    this.loggedWordArray = [];

    // The word (and/or blanks) to be displayed to the console.
    // e.g. loggedWordArray = [ [_, _, _, s] , [_, s] , [_] , [s, _, _, _, _, _, _, _] ]
    // displayedWord =  _ _ _ s   _ s   _   s _ _ _ _ _ _ _   
    this.displayedWord;

    // This variable will be set to true if the user enters a correct letter.
    this.choseCorrectLetter = false;

    // This array starts as an array of blanks, but these blanks are replaced as words are guessed.
    this.savedWordArray = [];

    this.guessedLetters = [];

    // creating a savedWordArray of blanks. 
    // These blanks will be replaced as words are guessed.
    // Also creates an array of subarrays.
    // Each subarray has the letters of a word as elements.
    for (i = 0; i < this.wordArray.length; i++) {                                       // looping through words
        this.newWordArray[i] = this.wordArray[i].split("");
        // now newWordArray = [ [T,h,i,s] , [i,s], [a], [s,e,n,t,e,n,c,e] ]

        // pushes new subarrays into the savedWordArray
        this.savedWordArray.push([]);


        // Looping through letters and creating the savedWordArray
        for (j = 0; j < this.newWordArray[i].length; j++) {

            // Pushes blanks into each savedWordArray subarray.
            this.savedWordArray[i].push("_");
        } 
    }


    // loops through each word of the phrase
    for (i = 0; i < this.wordArray.length; i++) {
            
        this.objectWordArray.push([]);

        // loops through each letter of each word
        for (j = 0; j < this.newWordArray[i].length; j++) {

            // takes each letter in the wordArray sub-arrays and turns those letters into Letter objects.
            var wordLetter = new Letter(this.newWordArray[i][j]);
            this.objectWordArray[i].push(wordLetter);
        }

    }


    // This function will display the "current status" of the guessed word to the console.
    this.wordFromLetters = function() {

        // Stores a property of each letter object into the newWordArray
        
        for (i = 0; i < this.objectWordArray.length; i++) {

            // pushes a new array into this objectWordArray2
            this.objectWordArray2.push([]);

            for (j = 0; j < this.objectWordArray[i].length; j++) {

                // If the guessCorrect parameter is true for the object, then the Letter object's
                // loggedLetter property will equal newWordArray[i][j]


                // This function will either display a letter or a blank to the console,
                // depending on whether or not the user guessed the correct letter.
                this.objectWordArray[i][j].displayLetter();

                if (this.objectWordArray[i][j].guessCorrect === true) {
                    this.savedWordArray[i].splice(j, 1, this.objectWordArray[i][j].loggedLetter);
                }

            }

            // loggedWordArray consists of a number of strings that equal the words of the phrase to be guessed.
            // These strings will contain characters, blanks, or both.
            // e.g. ['t _ _ _', '_ _', '_', '_ _ _ t _ _ _ _']
            this.loggedWordArray[i] = this.savedWordArray[i].join(" ");

        }

        // displayedWord will take the blanks and concatenate them into one big string.
        // e.g. t _ _ _   _ _   _   _ _ _ t _ _ _ _
        this.displayedWord = this.loggedWordArray.join("   ");

        // shows the displayed word to the console.
        console.log("\n" + this.displayedWord);

    }

        
   

    // This function checks each Letter object against the argument.
    this.checkUserArgs = function(argument) {
        
        // we will make argument = process.argv[2]

        // If the user enters anything other than a single character, then...
        if (argument.length != 1) {
            console.log("Please enter a single character!");
        }

        // If the user enters a letter that has already been guessed, then...
        else if (this.guessedLetters.includes(argument)) {
            console.log("This letter has already been guessed!");
        }

        // Otherwise...
        else {

            // Push the letter the user has guessed into the guessedLetters array
            this.guessedLetters.push(argument);

            // Loops through each word
            for (i = 0; i < this.objectWordArray.length; i++) {

                // Loops through each letter
                for (j = 0; j < this.newWordArray[i].length; j++) {

                    // checks if the letter of the word to be guessed is equal to the letter user entered.
                    this.objectWordArray[i][j].checkLetter(argument);
                    /* What this does:
                        1. If the argument equals the letter, then sets the letter's property guessCorrect = true*/

                    // check if the letter user entered is correct.
                    if (this.newWordArray[i].includes(argument)) {

                        // This variable will be set to true if the user enters a correct letter.
                        this.choseCorrectLetter = true;
                    }

                    else {
                        continue;
                    }

                }

                // Now I need to create code that tells the user their guess is incorrect
                // if their selected character is not in the word/phrase.

                // Maybe I can make a conditional statement that checks if the guessCorrect = false
                // for all Letter items in the objectWordArray subarrays.

            }

            // If the user did not choose a correct letter, then...
            if (this.choseCorrectLetter === false) {
                console.log("Incorrect!");
            }

            // If the user DID choose a correct letter, then...
            else {
                console.log("Correct!");

                // Sets this variable back to false again to check for the next letter the user enters.
                this.choseCorrectLetter = false;
            }


            // This function will display the "current status" of the guessed word to the console.
            this.wordFromLetters();
                
        }

           
    }


    //     /* 
    //     1. for loggedWordArray, blank(s) have been replaced by a properly guessed letter.
    //     2. Let's assume that savedWordArray already has properly guessed letters.
    //     3. I need to replace the blanks of the savedWordArray with the properly guessed letters of loggedWordArray.
    //     4. But, since loggedWordArray only holds the currently guessed letters, I must ensure that only the properly guessed letters get
    //         placed into the savedWordArray.
    //     */


}

   
// }

// Allows the Word constructor function to be exported.
module.exports = Word;



////////////////////////////////////////////////////////////////////////////////////

// Testing stuff
// var newWord = new Word("Banana");
// console.log(newWord.wordLetterArray)
// newWord.wordFromLetters();

// var newWord = new Word("this is a sentence")
// console.log(newWord.wordLetterArray);
// newWord.wordFromLetters()

// newWord.checkUserArgs(process.argv[2]);
// console.log(process.argv[2]);

// console.log(newWord.objectWordArray[1]);
// console.log(newWord.objectWordArray[0]);
// console.log(newWord.newWordArray);