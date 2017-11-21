var easyWords = ["pie", "apple", "lick", "floor"];
var mediumWords = ["computer", "modulus", "winter"];
var hardWords = ["symphony", "euphoric", "collateral"];
var lives = 6;
var allLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i" , "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var guessedLetters = [];
var word = "";
var endGame= "Hangman! Please press Lets Play to restart.";
var graveyard = [];


function determineWord(){
    var d = document.getElementById("difficulty").value;
    console.log(d);
    d = parseInt(d);
    if(d == 1){
        word = easyWords[Math.floor(Math.random() * easyWords.length)];
    }
    if(d == 2){
         word = mediumWords[Math.floor(Math.random() * mediumWords.length)];
    }
    if(d == 3){
         word = hardWords[Math.floor(Math.random() * hardWords.length)];
    }
    console.log(word);
    restartGame();
    document.getElementById("underscores").innerHTML = printWord();
    document.getElementById("lives").innerHTML = lives;
}



function guessLetter(guess){
    console.log(guess);
    guessedLetters.push(guess);
    document.getElementById("underscores").innerHTML = printWord();
    generateButtons();
    console.log(guessedLetters);
    //when do i deduct a turn and when do i not?

    if(lives >= 1){
        if(word.indexOf(guess) == -1){
            lives -= 1;
            document.getElementById("lives").innerHTML = lives;
            console.log(lives);
            graveyard.push(guess);

        }else if(word.indexOf(guess) > -1){
            guess += word;
        }
        if(lives == 0){
            document.getElementById("end").innerHTML = endGame;
        }

    }
    document.getElementById("images").innerHTML = images();
    console.log(images());
    document.getElementById("graveyard").innerHTML = graveyard;
}

function printWord() {
    var answer = "";
    if(lives > 0) {
        for (var i = 0; i < word.length; i++) {
            if (guessedLetters.indexOf(word[i]) > -1) {
                answer += word[i];
            }else {
                answer += "_ ";
            }
        }
    }
    if(word == answer){
        return "Congratulations, you won! Press Lets Play to play again.";
    }
    return answer;
}

//<button id=" + allLetters[i] +  " onclick="guessLetter(this.id)">F</button>

function generateButtons(){
    var output = "";
    for(var i=0; i < allLetters.length; i++){
        if(guessedLetters.indexOf(allLetters[i]) > -1){
            output +="<button value='" + allLetters[i] + "' id='" +allLetters[i]
                + "' onclick= 'guessLetter(this.id)' disabled= 'true'>" + allLetters[i] + "</button>";
        }else{
            output +="<button value='" + allLetters[i] + "' id= '" + allLetters[i]
                +  "' onclick = 'guessLetter(this.id)'>" + allLetters[i] + "</button>";
            //console.log(output);
        }
    }
    document.getElementById("myDiv").innerHTML = output;
}

function images(){
    return "<img src='images/" + lives + ".png' />";
}

function restartGame(){
    graveyard = [];
    guessedLetters = [];
    generateButtons();
    lives = 6;
    console.log(guessedLetters);
    document.getElementById("end").innerHTML = "";
    document.getElementById("graveyard").innerHTML = graveyard;
    document.getElementById("images").innerHTML = images();
}

