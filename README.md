# Word-Guess

### Description

This application is a word-guessing game similar to hangman. The application can be started by running index.js with Node on the command line. This application showcases modularity in order to reduce clutter and better structure the logic of every file.

### Requirements

* Node.js
* The "inquirer" node package

### File Structure

The main file that controls the overall logic of the application is index.js, but by far the most important files in the application are the files on which index.js depends, Letter.js and Word.js. These two files handle different responsibilities: Letter.js is in charge of determining whether or not a certain letter should be displayed to the screen by turning a letter into an object, whereas Word.js transforms a word or phrase into a collection of Letter object and manages each of these objects. Specifically, Word.js determines if a user's guess for a letter matches any of a word's Letter objects and displays the characters of each guessed letter to the console.

The index.js file is responsible for taking the functionality of Letter.js and Word.js and structuring that functionality into a game. The index.js file begins by selecting a random word from a list of words inside the index.js file. Then, index.js uses the inquirer node package to ask the user for a letter. After accepting the user's letter, index.js checks the user's letter against the word using the functions in Word.js. In turn, the functions in Word.js depend on the functions in Letter.js. After checking the user's letter, a function in Word.js will inform the user if the letter was a correct or incorrect guess. More details on the functions of each file will be described in the next section.

### Files and Functions

#### Letter.js

Contains a constructor function _Letter_ that accepts a parameter _letter_

__Properties of _Letter_ object:__

* _guessCorrect_: Boolean. Reads whether or not the letter has been guessed correctly.

* _loggedLetter_: String. A variable that holds the character that will be displayed to the console.

* _displayLetter_: Function. Displays either a letter or an underscore/blank to the console.
    * If the letter was guessed correctly (if _guessCorrect = true_), then the _letter_ parameter will be displayed to the console.
    * If the letter was not guessed correctly (if _guessCorrect = false_), then an underscore ("_") will be displayed to the console.

* _checkLetter_: Function. Accepts a parameter _guess_. Checks whether the user's guess was a correct guess.
    * If the user's guess is correct (if _guess_ = _letter_), then sets _guessCorrect_ to true.


#### Word.js

Contains a constructor function _Word_ that accepts a parameter _word_
For the purposes of this section, I will set _word_ to "this is a sentence"

__Properties of _Word_ object - non-functions:__

* _wordArray_: Array. Each element holds one word of the word or phrase stored in the _word_ parameter.
    * e.g. ['this', 'is', 'a', 'sentence']

* _newWordArray_: Array. Each element is a subarray that reperesents one word. Each subarray has the letters of the corresponding word as elements.
    * e.g. [ [t,h,i,s] , [i,s] , [a] , [s,e,n,t,e,n,c,e] ]

* _objectWordArray_: Array. Similar to _newWordArray_, but each letter will be turned into a __Letter__ object.
    * e.g. [ [{obj},{obj},{obj},{obj}] , [{obj},{obj}] , [{obj}] , [{obj},{obj},{obj},{obj},{obj},{obj},{obj},{obj}] ]

* _savedWordArray_: Array. Has the same number of arrays, subarrays, and elements of _newWordArray_. All of these elements start off as underscores (or "blanks"). As more letters are guessed, the correctly guessed letters replace the corresponding blanks.

* _loggedWordArray_: Array. Will hold the __Letter__ objects' _loggedLetter_ properties in preparation for display on the console.

* _displayedWord_: String. The word (and/or blanks) to be displayed to the console. 

* _choseCorrectLetter_: Boolean. Will be set to true if the user guesses a correct letter.

* _guessedLetters_: Array. Holds all of the letters that the user has already guessed.


__Properties of _Word_ object - Functions:__

* _wordFromLetters_: Displays the current status of the guessed word to the console.
    * Runs the _displayLetter_ function on each object of the _objectWordArray_.
    * If the _guessCorrect_ property of an object in the _objectWordArray_ is _true_, then the object's letter (stored in _loggedLetter_) is spliced into the _savedWordArray_.
    * After _savedWordArray_ has been updated in this manner, _loggedWordArray_ will update itself by turning each subarray of _savedWordArray_ into a string and setting itself equal to this new array.
    * _displayedWord_ will then update itself by joining the array elements of _loggedWordArray_ into a string and then setting itself equal to that string.
    * _displayedWord_ will then be logged to the console.

* _checkUserArgs_: Checks the user's guessed letter against each __Letter__ object. Accepts a parameter _argument_, which represents the letter the user will guess.
    * If the _argument_ parameter's length is not 1, then the user will be told to enter a single character.
    * If the _guessedLetters_ array contains _argument_, then the user will be told that their letter has already been guessed.
    * If _argument_ does not meet those two requirements, then...
        * Pushes _argument_ into the _guessedLetters_ array.
        * Runs _checkLetter(argument)_ (from __Letter.js__) on each object in _objectWordArray_
        * If _argument_ is inside _newWordArray_, then _choseCorrectLetter_ will be set to _true_.
        * If _choseCorrectLetter_ is true, then the console will log "Correct!"
        * If _choseCorrectLetter_ is false, then the console will log "Incorrect!"
        * Then _wordFromLetters_ is run.


#### index.js

Contains the following important variables:
* wordList: Array. Contains words that will be randomly picked.
* tries: Number. The number of tries the user has to guess the correct word.
* currentWord: String. The word that the user currently has to guess.

__Functions__

* _chooseNewWord_: Randomly chooses a word from the wordList for the user to guess
    * Randomly chooses a word from the wordList
    * Makes _currentWord_ a new __Word__ object with the randomly chosen word as the parameter.
    * sets _tries_ to the length of _currentWord_ plus 3.
    * Runs the _wordFromLetters_ function (from __Word.js__) on _currentWord_
    * Runs the _askLetter_ function.

* _askLetter_: Asks the user for input.
    * If _tries_ ever reaches 0, the user loses.
    * The _inquirer_ node package asks the user for a letter.
    * If the user entered a string of length 1, then the number of tries will go down by 1.
    * Runs the _checkUserArgs_ function (from __Word.js__) with the user's guess as a parameter on _currentWord_
    * If the user still has letter to guess, then _askLetter_ is run again.
    * If the user has guessed all the letters in the current word, then they win!
    * After the user wins or loses, they are asked if they want to play again via the _inquirer_ node package. 
        * If the answer is "yes," then _chooseNewWord_ is run again. 
        * If the answer is "no," then the application closes.

<br/>
<br/>

#### App in Action

First, the user runs the app by navigating to the app's root folder and running the command "node index.js." Running this command displays the number of letters in the word to be guessed as well as the number of tries the user has left to guess the letters in the word. 

![start_app](https://github.com/Mattmej/Word-Guess/blob/master/gifs/start_app.gif)

<br/>
<br/>

The user can then begin guessing the word's letters by entering them into the command line and pressing "enter." The application will tell the user if their guess is correct or incorrect. The letters the user has already guessed will be displayed under the "guessed letters" section.

![correct_and_incorrect](https://github.com/Mattmej/Word-Guess/blob/master/gifs/correct_and_incorrect.gif)

<br/>
<br/>

If the user guesses all of the correct letters in the word, then the user wins.

![user_wins](https://github.com/Mattmej/Word-Guess/blob/master/gifs/user_wins.gif)

<br/>
<br/>

However, if the user runs out of tries in the process of guessing the word's correct letters, then the user loses.

![user_loses](https://github.com/Mattmej/Word-Guess/blob/master/gifs/user_loses.gif)



