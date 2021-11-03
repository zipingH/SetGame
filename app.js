import Card from './scripts/card.js';

var deck = [];
// var setDeck = [];
// var setOfCards = {};
var setOfCards = [];

var disjoint_set = {};


var setOutput = "";
var output_message = "";

//HTML DOM
var fileInput = document.getElementById("fileInput");
var fileOutput = document.getElementById("fileOutput");

//file input function
fileInput.onchange = function () {
  var file = fileInput.files[0];
  var reader = new FileReader();

  reader.onload = function (event) {
    //read entire file
    console.log("Inputs: \n");
    // console.log(this.result);
    //read file line by line.
    var lines = this.result.split('\n');
    // console.log(lines);

    for (let i = 1; i < lines.length; i++) {
      var line = lines[i];
      // console.log(line);
      var lineText = line.split(' ');
      // console.log(lineText);

      let card = createCard(lineText);

      deck.push(card);
    }

    //sort by card properties
    deck.sort(compareNumber);
    deck.sort(compareShading);
    deck.sort(compareColor);

    console.log(deck);
    console.log('\n');

    setOfCards = is_SetOfCards(deck);

    // let setOfCards_length = Object.keys(setOfCards).length;
    let setOfCards_length = setOfCards.length;

    // console.log("Set of Cards(setOfCards): \n");
    // console.log(setOfCards);
    // console.log("\n");


    //iterate through setOfCards Object and outputs a set of 3 cards.
    // for(let [key, card] of Object.entries(setOfCards)){
    //   for(let i = 0; i < card.length; i++){
    //     setOutput += card[i].toStringCard();
    //   }
    //   setOutput += "\n";
    // }

    //iterate through setOfCards array and print objects.
    // let next = 1;
    for (let i = 0; i < setOfCards.length; i++) {
      // console.log(`Index ${i}: ${setOfCards[i]}`);

      // for(let j = i+1; j < setOfCards.length; j++){
      //   disjoint_set = is_Disjoint(setOfCards[i], setOfCards[j]);
      // }
      for (let j = 0; j < 3; j++) {
        // console.log(`[row: ${i}, col: ${j}]: ${setOfCards[i][j].toStringCard()}`);
        setOutput += setOfCards[i][j];
      }
      setOutput += "\n";
    }

    // console.log(setOfCards[0][0]);
    // console.log(setOfCards);
    // console.log("\n");

    let count = is_Disjoint_Set(setOfCards);

    // disjoint_set = is_Disjoint_Set(setOfCards);
    // console.log(`Maximum number of disjoint SETs: ${disjoint_set.length}`);
    // console.log("\n");
    // console.log(disjoint_set);
    console.log(`Maximum number of disjoint SETs: ${count}`);

    //output
    let num_of_possible = "Number of possible SETs of three cards: " + setOfCards_length + "\n\n";
    output_message += num_of_possible + setOutput;
    // var jsonString = JSON.stringify(deck);
    // console.log(deck);
    // fileOutput.textContent = jsonString;

    // console.log(setOutput);
    // fileOutput.textContent = setOutput;
    fileOutput.textContent = output_message;
  }
  reader.readAsText(file);
};


function createCard(lineText) {
  var colorText = lineText[0];
  var color;
  var symbol = lineText[1].charAt(0);
  var shading;
  // console.log(lineText[1]);
  var letter;

  // features/properties of the card with values either of these (0,1,2)

  //blue = 0, green = 1, yellow = 2
  if (colorText === "blue") {
    color = 0;
  }
  else if (colorText === "green") {
    color = 1;
  }
  else if (colorText === "yellow") {
    color = 2;
  }

  //letter of symbol
  // A = 0, S = 1 , H = 2
  if (symbol === "@" || symbol === "a" || symbol === "A") {
    letter = 0;
  }
  else if (symbol === "$" || symbol === "s" || symbol === "S") {
    letter = 1;
  }
  else if (symbol === "#" || symbol === "h" || symbol === "H") {
    letter = 2;
  }
  else {
    console.log("Incorrect symbol letter");
  }

  //shading
  // lower-case = 0, upper-case = 1, symbol-case = 2
  if (symbol === "a" || symbol === "s" || symbol === "h") {
    shading = 0;
  }
  else if (symbol === "A" || symbol === "S" || symbol === "H") {
    shading = 1;
  }
  else if (symbol === "@" || symbol === "$" || symbol === "#") {
    shading = 2;
  }
  else {
    console.log("Incorrect shading/symbol");
  }
  //number
  //check the number of occurences of symbol
  var number = 0;
  for (let i = 0; i < lineText[1].length; i++) {
    if (lineText[1].charAt(i) === lineText[1].charAt(i + 1)) {
      number += 1;
    }
  }
  // console.log(number);
  var card = new Card(color, symbol, shading, number, letter);
  return card;
}


function is_SetOfCards(deck) {
  let key = 0;
  // let setOfCards = {};
  let setOfCards = [];
  for (let i = 0; i < deck.length; i++) {
    for (let j = i + 1; j < deck.length; j++) {
      for (let k = j + 1; k < deck.length; k++) {
        let setArray = is_Set(deck[i], deck[j], deck[k]);
        if (setArray.length > 0) {
          // setOfCards[key] = setArray;
          // key++;
          setOfCards.push(setArray);
        }
      }
    }
  }
  return setOfCards;
}


function is_Set(card1, card2, card3) {
  let setFound = [];
  if (isValidSet(card1, card2, card3)) {
    setFound.push(card1.toStringCard(), card2.toStringCard(), card3.toStringCard());
  }
  return setFound;
}


function areAllEqual(x, y, z) {
  return x === y && y === z && x === z;
}

function areAllDifferent(x, y, z) {
  return x !== y && y !== z && x !== z;
}

function isValidSet(card1, card2, card3) {
  var valid = true;

  //same
  var sameColor = areAllEqual(card1.color, card2.color, card3.color);

  var sameShading = areAllEqual(card1.shading, card2.shading, card3.shading);

  var sameNumber = areAllEqual(card1.number, card2.number, card3.number);

  var sameSymbol = areAllEqual(card1.letter, card2.letter, card3.letter);

  //different
  var diffColor = areAllDifferent(card1.color, card2.color, card3.color);

  var diffShading = areAllDifferent(card1.shading, card2.shading, card3.shading);

  var diffNumber = areAllDifferent(card1.number, card2.number, card3.number);

  var diffSymbol = areAllDifferent(card1.letter, card2.letter, card3.letter);

  //rules of set game
  if (!(sameColor || diffColor)) {
    valid = false;
  }
  if (!(sameShading || diffShading)) {
    valid = false;
  }
  if (!(sameNumber || diffNumber)) {
    valid = false;
  }
  if (!(sameSymbol || diffSymbol)) {
    valid = false;
  }
  return valid;
}

//functions to comapare and sort card with their properties
function compareNumber(a, b) {
  if (a.number < b.number) {
    return -1;
  }
  if (a.number > b.number) {
    return 1;
  }
  return 0;
}

function compareShading(a, b) {
  if (a.shading < b.shading) {
    return -1;
  }
  if (a.shading > b.shading) {
    return 1;
  }
  return 0;
}

function compareColor(a, b) {
  if (a.color < b.color) {
    return -1;
  }
  if (a.color > b.color) {
    return 1;
  }
  return 0;
}

function is_Disjoint(set1, set2) {
  // Take every element of set1[] and
  // search it in set2
  for (let i = 0; i < set1.length; i++) {
    for (let j = 0; j < set2.length; j++) {
      if (set1[i] === set2[j]){
        return false;
      }
    }
  }
  // If no element of set1 is present in set2
  return true;
}

function is_Disjoint_Set(sets) {
  let array = [];
  let count = 0;

  for (let i = 0; i < setOfCards.length; i++) {
    for (let j = i + 1; j < setOfCards.length; j++) {
      if (is_Disjoint(setOfCards[i], setOfCards[j])) {
        // array.push([setOfCards[i], setOfCards[j]]);
        count++;
      }
    }
  }
  return count;
}


































