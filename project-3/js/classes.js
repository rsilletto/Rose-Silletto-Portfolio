
class Circle extends PIXI.Sprite{ // trash class

    constructor(radius, color=0xFF0000, x=0, y=0) { // trash types are randomly generated
        let trashArray = ['images/six-pack-sm.png',
        'images/plastic-bag.png',
        'images/six-pack.png',
        'images/plastic-jug.png',
        'images/can.png',
        'images/soda-can.png',
        'images/glass-bottle.png'];

        let randNum = Math.floor(Math.random() * trashArray.length); // randomly pick an index of the array

        super(app.loader.resources[trashArray[randNum]].texture); // display the corresponding sprite
        
        this.anchor.set(0.5, 0.5);
        this.x = x;
        this.y = y;
        this.radius = radius;
        // variables
        this.fwd = getRandomUnitVector();
        this.speed = 50;
        this.isAlive = true;

        this.trashType;

        // classifying and setting attributes for each trash type
        if(randNum < 4){
            this.trashType = "plastic";
            this.scale.set(2);
            this.scale.y *= -1;
        }
        else if(randNum < 6){
            this.trashType = "metal";
            this.scale.set(0.75);
        }
        else{ 
            this.trashType = "glass";
            this.scale.set(0.75);
        }
    }



    move(dt=1/60) {
        this.x += this.fwd.x * this.speed * dt;
        this.y += this.fwd.y * this.speed * dt;
    }

    // reflect = change direction when you hit canvas edge
    reflectX() {
        this.fwd.x *= -1;
    }

    reflectY() {
        this.fwd.y *= -1;
    } 
}

class Enemy extends PIXI.Sprite{ // shark

    constructor(radius, color=0xFF0000, x=0, y=0){

        super(app.loader.resources["images/shark.gif"].texture);
        this.scale.set(2.25);
        this.anchor.set(0.5, 0.5);
        this.anchor
        this.x = x;
        this.y = y;
        this.radius = radius;
        // variables
        this.fwd = getRandomUnitVector();
        this.isAlive = true;
        this.speed = 30;
    }

    move(dt=1/60) {
        this.x += this.fwd.x * this.speed * dt;
        this.y += this.fwd.y * this.speed * dt;
    }

    reflectX() {
        this.fwd.x *= -1;
    }

    reflectY() {
        this.fwd.y *= -1;
    } 

}

class Diver extends PIXI.Sprite{ // diver

    constructor(x, y){
        super(app.loader.resources["images/nurek-diver.png"].texture);
        this.anchor.set(0.5, 0.5); //anchor is in center of sprite
        this.scale.set(2);
        this.x = x;
        this.y = y;
        this.isAlive = true;
    }
}
