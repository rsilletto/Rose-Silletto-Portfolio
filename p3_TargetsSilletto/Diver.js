/**
 * Rose Silletto, 11.23.21
 * Creates diver that moves across canvas based on user interaction.
 * Diver moves up, down, left, and right with WASD or arrow keys.
 */

class Diver { // creates new instance of Diver

    constructor(x, y, diverColor, leftKey, rightKey, upKey, downKey) {
        
        // properties
        this.x = x;
        this.y = y;
        this.diverColor = diverColor;

        this.leftKey = leftKey;
        this.rightKey = rightKey;
        this.upKey = upKey;
        this.downKey = downKey;
        
        this.movementState = "left";

        this.influenceState = "1";
        
    }
    
    move() { // describes movement of Diver
        
        if (keyIsDown(this.leftKey))
        { this.x = this.x - 2; }
        else if (keyIsDown(this.rightKey))
        { this.x = this.x + 2; }
        else if (keyIsDown(this.upKey))
        { this.y = this.y - 2; }
        else if (keyIsDown(this.downKey))
        { this.y = this.y + 2; }
        else
        { this.x = this.x; }
        
    }

    display() { // displays Diver

        stroke(this.diverColor);
        fill(this.diverColor);
        strokeWeight(3);

        circle(this.x, this.y, 40); // head
        line(this.x, this.y + 20, this.x, this.y + 70); // body
        line(this.x, this.y + 45, this.x - 20, this.y + 40); // left arm
        line(this.x, this.y + 45, this.x + 20, this.y + 40); // right arm
        line(this.x, this.y + 70, this.x - 20, this.y + 100); // left leg
        line(this.x, this.y + 70, this.x + 20, this.y + 100); // right leg

        if (this.movementState === "left")
        { line(this.x + 20, this.y - 20, this.x + 20, this.y + 25); } // draws oxygen tube on right
        else if (this.movementState === "right")
        { line(this.x - 20, this.y - 20, this.x - 20, this.y + 25); } // draws oxygen tube on left

        if (this.influenceState == "2")
        { this.diverColor = "blue"; }

        if (this.influenceState == "3")
        { this.diverColor = "green"; }

    }

    updateState() { // updates Diver's state based on user inputs

        if (keyIsDown(this.leftKey))
        { this.movementState = "left"; }
        else if (keyIsDown(this.rightKey))
        { this.movementState = "right"; }

        if (mouseIsPressed === true)
        { 
            this.influenceState = "2";

            if (this.influenceState === "3")
            { this.influenceState = "2"; }
        }

    }

    setState(num) {

        this.influenceState = num;
        console.log(this.influenceState)
    }

    within(plastic) { // updates plastic color when diver is within (near) plastic

        let distance = dist(this.x, this.y, plastic.x, plastic.y);

       if (distance <= this.x/5) 
       { plastic.changeColor(this.diverColor); }
    }

}
