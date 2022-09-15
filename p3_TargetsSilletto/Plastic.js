/**
 * Rose Silletto, 11.23.21
 * Creates plastic object that interacts with divers
 */

 class Plastic { // creates new instance of Plastic object

    constructor(x, y, plasticColor) {
        
        // properties
        this.x = x;
        this.y = y;
        this.plasticColor = plasticColor;
        
    }

    display() { // displays Trash

        stroke(this.plasticColor);
        fill(this.plasticColor);
        strokeWeight(3);

        arc(this.x, this.y, 50, 60, 0, PI);
        
    }

    changeColor(diverColor) {

        this.plasticColor = diverColor; // changes plastic color to match diver color
    }

}
