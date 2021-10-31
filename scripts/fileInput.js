var file(){
  //input file
  var fileInput = document.getElementById("fileInput");
  var fileOutput = document.getElementById("fileOutput");

  fileInput.onchange = function(){
    var file = this.files[0];
    var reader = new FileReader();

    reader.onload = function(event){
      //read entire file
      // console.log(this.result);

    //read file line by line.
      var lines = this.result.split('\n');
      var numberOfCards = lines[0];
      for(var line = 1; line < lines.length; line++){
        console.log(lines[line]);
      
        //output
        fileOutput.textContent = event.target.result;
      }
      // console.log(numberOfCards);
    }
    reader.readAsText(file);
  };
}
export {file};


