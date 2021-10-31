import Card from './scripts/card.js';

var card = new Card(1, 2, 3, 4);
console.log(card);

//input file
var fileInput = document.getElementById("fileInput");
var fileOutput = document.getElementById("fileOutput");

fileInput.onchange = function(){
  var file = this.files[0];
  var reader = new FileReader();
  var output_message = "";

  reader.onload = function(event){
    //read entire file
    // console.log(this.result);
   //read file line by line.
    var lines = this.result.split('\n');

    // var numberOfCards = lines[0];
    for(var line = 1; line < lines.length; line++){
      // console.log(lines[line]);
      output_message += lines[line];
    }
    
    //output
    console.log(output_message); 
    fileOutput.textContent = output_message;
    
  }
  reader.readAsText(file);
};

























