import Card from './scripts/card.js';

// var numberOfCards;
var deck = [];
// var card = new Card(1, 2, 3, 4);
// console.log(card);
var 3setOfCards = {};

//HTML DOM
var fileInput = document.getElementById("fileInput");
var fileOutput = document.getElementById("fileOutput");

//file input function
fileInput.onchange = function(){
  var file = fileInput.files[0];
  var reader = new FileReader();
  var output_message = "";

  reader.onload = function(event){
    //read entire file
    // console.log(this.result);
   //read file line by line.
    var lines = this.result.split('\n');
    // console.log(lines);
    // numberOfCards = lines[0];

    for(let i = 1; i < lines.length; i++){
      var line = lines[i];
      // console.log(line);
      // output_message += line;
      var lineText = line.split(' ');
      // console.log(lineText);

      let card = createCard(lineText);
      // console.log(card);
      deck.push(card);
    }

    // //iterate through deck
    // for (let [num, card] of Object.entries(deck)){
    //   // console.log(card);
    // }

    console.log(deck[0].color, deck[0].symbol);
    // console.log(numberOfCards);
    // console.log(output_message); 


    //output
    var jsonString = JSON.stringify(deck); 
    fileOutput.textContent = jsonString;
    // fileOutput.textContent = output_message;
  }
  reader.readAsText(file);
};



function createCard(lineText){
  var color = lineText[0];
  var symbol = lineText[1].charAt(0);
  var shading = "";
  // console.log(lineText[1]);
  //shading
  if(symbol === "@" || symbol === "$" || symbol === "#"){
    shading = "symbol-case";
  }
  else if(symbol === "a" || symbol === "s" || symbol === "h"){
    shading = "lower-case";
  }
  else if(symbol === "A" || symbol === "S" || symbol === "H"){
    shading = "upper-case";
  }
  else{
    console.log("Incorrect symbol");
  }
  //number
  //check the number of occurences of symbol
  var number = 1;
  for(let i = 0; i < lineText[1].length; i++){
    if(lineText[1].charAt(i) === lineText[1].charAt(i+1)){
      number += 1;
    }
  }
  // console.log(number);
  var card = new Card(color, symbol, shading, number);
  return card;
}





























