export default class Card{
  constructor(color, symbol, shading, number, letter){
    // features/properties of the card with values either of these (0,1,2);
    this.color = color;
    this.symbol = symbol;
    this.shading = shading;
    this.number = number;
    this.letter = letter;
  }
  
  toStringCard(){
    let colorText = "";
    if(this.color === 0){
      colorText = "blue";
    }
    else if(this.color === 1){
      colorText = "green";
    }
    else if(this.color === 2){
      colorText = "yellow"
    }

    let string = colorText + " " + this.symbol.repeat(this.number+1) + "\n";
    
    return string;
  }
}