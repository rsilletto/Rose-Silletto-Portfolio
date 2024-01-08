
"use strict";

const app = new PIXI.Application({
    width: 800,
    height: 600,
});

window.onload = function() { // instantiates the canvas and a div when the page loads
    document.querySelector("div").appendChild(app.view);
    document.querySelector("canvas").onselectstart = function() { return false; }
}

// global variables

// constants
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;	
const prefix = "ras5491-"; // my banjo id

// aliases
let stage;

// game variables
let startScene;
let gameScene,diver,scoreLabel,lifeLabel, timerLabel;
let hitSound, pickupSound, winSound;
let gameOverScene;

let circles = []; // circles = trash, started with circles in prototype
let enemies = []; // enemies = sharks
let score = 0;
let life = 100;
let levelNum = 1;
let paused = true;
let gameOverScoreLabel;
let time;
let diverTexture;
let plasticTexture1;
let plasticTexture2;
let enemyTexture;
let key; // localStorage score key
let highScoreLabel;

function setup() {
	stage = app.stage;

    app.renderer.backgroundColor = 0x2cf3f5; // changes the game's background color to an ocean-y blue color

	// Create the `start` scene
    startScene = new PIXI.Container();
    stage.addChild(startScene);
	
	// Create the main `game` scene and make it invisible
    gameScene = new PIXI.Container();
    gameScene.visible = false;
    stage.addChild(gameScene);

	// Create the `gameOver` scene and make it invisible
	gameOverScene = new PIXI.Container();
    gameOverScene.visible = false;
    stage.addChild(gameOverScene);

	// Create labels for all 3 scenes
	createLabelsAndButtons();

    // create diver
    diver = new Diver();
    gameScene.addChild(diver);

    // load sounds
    hitSound = new Howl({
        src: ['sounds/hit.mp3']
    });

    pickupSound = new Howl({
        src: ['sounds/plastic-bag.mp3']
    });

    winSound = new Howl({
        src: ['sounds/beep.mp3']
    });

	// Start update loop
    app.ticker.add(gameLoop);
	
	// Now our `startScene` is visible
	// Clicking the button calls startGame()
}

function createLabelsAndButtons() { // this function creates all the labels and buttons

    let buttonStyle = new PIXI.TextStyle({
        fill: 0x0000FF,
        fontSize: 48,
        fontFamily: "Futura"
    });

    let startLabel1 = new PIXI.Text("Ocean Cleanup!"); // title
    startLabel1.style = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        fontSize: 84,
        fontFamily: "Ubuntu",
        stroke: 0x0000FF,
        strokeThickness: 6
    });
    startLabel1.x = 100;
    startLabel1.y = 100;
    startScene.addChild(startLabel1);

    // game instructions
    let instructionLabel = new PIXI.Text("Collect as much trash as you can in 60 seconds! \n Move the diver with your mouse.");
    instructionLabel.style = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        fontSize: 24,
        fontFamily: "Ubuntu",
        stroke: 0x0000FF,
        strokeThickness: 2.5
    });
    instructionLabel.x = 150;
    instructionLabel.y = sceneHeight - 350;
    startScene.addChild(instructionLabel);

    // start button
    let startButton = new PIXI.Text("Start");
    startButton.style = buttonStyle;
    startButton.x = (sceneWidth/2) - 50;
    startButton.y = sceneHeight - 200;
    startButton.interactive = true;
    startButton.buttonMode = true;
    startButton.on("pointerup", startGame);
    startButton.on('pointerover', e => e.target.alpha = 0.7);
    startButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    startScene.addChild(startButton);

    // new text style for gameScene
    let textStyle = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        fontSize: 18,
        fontFamily: "Ubuntu",
        stroke: 0x0000FF,
        strokeThickness: 4
    });

    // score label
    scoreLabel = new PIXI.Text();
    scoreLabel.style = textStyle;
    scoreLabel.x = 5;
    scoreLabel.y = 5;
    gameScene.addChild(scoreLabel);
    increaseScoreBy(0);

    // life label
    lifeLabel = new PIXI.Text();
    lifeLabel.style = textStyle;
    lifeLabel.x = 5;
    lifeLabel.y = 26;
    gameScene.addChild(lifeLabel);
    decreaseLifeBy(0);
    
    // timer
    timerLabel = new PIXI.Text();
    timerLabel.style = textStyle;
    timerLabel.x = 5;
    timerLabel.y = 46;
    gameScene.addChild(timerLabel);
    
    // set up `gameOverScene`
    // make game over text
    let gameOverText = new PIXI.Text("Game Over!");
    textStyle = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        fontSize: 72,
        fontFamily: "Ubuntu",
        stroke: 0x0000FF,
        strokeThickness: 6
    });
    gameOverText.style = textStyle;
    gameOverText.x = 220;
    gameOverText.y = sceneHeight/2 - 160;
    gameOverScene.addChild(gameOverText);

    // 3B - make "play again?" button
    let playAgainButton = new PIXI.Text("Play Again?");
    playAgainButton.style = buttonStyle;
    playAgainButton.x = 280;
    playAgainButton.y = sceneHeight - 150;
    playAgainButton.interactive = true;
    playAgainButton.buttonMode = true;
    playAgainButton.on("pointerup",startGame); // startGame is a function reference
    playAgainButton.on('pointerover',e=>e.target.alpha = 0.7); // concise arrow function with no brackets
    playAgainButton.on('pointerout',e=>e.currentTarget.alpha = 1.0); // ditto
    gameOverScene.addChild(playAgainButton);

    // score label on game over
    gameOverScoreLabel = new PIXI.Text();
    gameOverScoreLabel.style = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        fontSize: 32,
        fontFamily: "Ubuntu",
        stroke: 0x0000FF,
        strokeThickness: 4
    });
    gameOverScoreLabel.x = 255;
    gameOverScoreLabel.y = sceneHeight - 300;
    gameOverScene.addChild(gameOverScoreLabel);

    // high score label
    highScoreLabel = new PIXI.Text("Your High Score: ");
    highScoreLabel.style = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        fontSize: 26,
        fontFamily: "Ubuntu",
        stroke: 0x0000FF,
        strokeThickness: 4
    });
    highScoreLabel.x = 280;
    highScoreLabel.y = sceneHeight - 250;
    gameOverScene.addChild(highScoreLabel);
}

// function initiates on clicking the start button, sets up the game
function startGame(){
    time = 0;
    startScene.visible = false;
    gameOverScene.visible = false;
    gameScene.visible = true;
    levelNum = 1;
    score = 0;
    life = 100;
    diver.x = 300;
    diver.y = 350;
    increaseScoreBy(0);
    decreaseLifeBy(0);
    loadLevel(); 
    time = 0;
    
}

// function controls and updates the player's score + score label
function increaseScoreBy(value) {
    score += value;
    score = parseInt(score);
    scoreLabel.text = `Score:  ${score}`;
}

// controls life and life label
function decreaseLifeBy(value) {
    life -= value;
    life = parseInt(life);
    lifeLabel.text = `Life:     ${life}%`;
}

// timer label
function Timer() {
    let timerText = 60 - parseInt(time);
    timerLabel.text = `Time:    ${timerText}`;
}

// display score on game over
function calculateScore() {
    score = parseInt(score);
    gameOverScoreLabel.text = `Your Final Score:  ${score}`;
}

function gameLoop(){ // runs continuously during gameplay
	if (paused) return;

    // timeoutID = setTimeout(end, 60000); // 60,000 miliseconds = 1 minute | old timer method

	// Calculate "delta time"
    let dt = 1/app.ticker.FPS;
    if (dt > 1/12) dt=1/12;

    time += dt; // creates counter based on delta time

    Timer(); // call to timer function (update label text)
    
    if(time >= 60){ // end game after 60 seconds
        end();
    }

    // console.log(Math.floor(time)); // for troubleshooting
    
    // move player / diver
    let mousePosition = app.renderer.plugins.interaction.mouse.global;
   
    let amt = 4 * dt; // player speed
    
    let newX = lerp(diver.x, mousePosition.x, amt); // delays diver movement from mouse movement
    let newY = lerp(diver.y, mousePosition.y, amt); // ditto
    
    let w2 = diver.width/2;
    let h2 = diver.height/2;
    diver.x = clamp(newX,0+w2,sceneWidth-w2); // keeps diver on canvas
    diver.y = clamp(newY,0+h2,sceneHeight-h2); // ditto
	
	// Move Circles (trash)
	for (let c of circles) {
        c.move(dt);

        if (c.x <= c.radius || c.x >= sceneWidth-c.radius){
            c.reflectX();
            c.move(dt);
        }

        if (c.y <= c.radius || c.y >= sceneHeight-c.radius){
            c.reflectY();
            c.move(dt);
        }
    }

    // move sharks
    for (let e of enemies) {
        e.move(dt);

        if (e.x <= e.radius || e.x >= sceneWidth-e.radius){
            e.reflectX();
            e.anchor.x = 0.5;
            e.scale.x *= -1;
            e.move(dt);
        }

        if (e.y <= e.radius || e.y >= sceneHeight-e.radius){
            e.reflectY();
            e.move(dt);
        }
    }

	// Check for Collisions
	for (let c of circles){
        
        // trash and diver collision
        if (c.isAlive && rectsIntersect(c,diver)){
            pickupSound.play(); // play item pickup sound
            gameScene.removeChild(c);
            c.isAlive = false;
            if(c.trashType == "plastic"){
                increaseScoreBy(10);
            }
            else{ increaseScoreBy(5); }

            // console.log(c.trashType);
        }
    }
    // collision with enemies
    for(let e of enemies){

        if (e.isAlive && circlesIntersect(e,diver)){
            hitSound.play(); // play hit sound
            gameScene.removeChild(e);
            e.isAlive = false;
            decreaseLifeBy(20);
        }
    }
	
	// clean up the game scene
	
        // get rid of dead circles
        circles = circles.filter(c=>c.isAlive);
        enemies = enemies.filter(e=>e.isAlive);

	// Is game over?
    if (life <= 0){
        end();
        return; // return here so we skip level load
    }
	
	// Load next level
    if ( circles.length == 0){
        levelNum ++;
        loadLevel();
    }
    
}

// shark hitbox
function circlesIntersect(a,b) {

    let dist = Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

    let sharkRad = 40; // shark hitbox size = 40 px
    
    return dist < sharkRad; // return true if the player is less than 40 px from the shark (centerpoint)
   
}

function createCircles(numCircles) { // generate trash

    for(let i=0; i < numCircles; i++) {
        let c = new Circle(10, 0xFFFF00);
        c.x = Math.random() * (sceneWidth -50) +25;
        c.y = Math.random() * (sceneHeight - 50) +25;
        circles.push(c);
        gameScene.addChild(c);
    }
}

function createEnemies(numEnemies) { // generate sharks

    for(let i=0; i < numEnemies; i++) {
        let e = new Enemy(20, 0xFF0000);
        e.x = Math.random() * (sceneWidth -50) +25;
        e.y = Math.random() * (sceneHeight - 100) +25;
        enemies.push(e);
        gameScene.addChild(e);

        if(rectsIntersect(e,diver)){
            e.y += 20;
        }
    }
}

function loadLevel(){ // set up level
	createCircles(levelNum * 15);
    if(levelNum < 4){ createEnemies(levelNum * 2); }
    else{ createEnemies(levelNum * 0); }
	paused = false;
}

function end(){ // game over!
    paused = true;

    // clear out level

    circles.forEach(c=>gameScene.removeChild(c)); // delete trash
    circles = [];

    enemies.forEach(e=>gameScene.removeChild(e)); // delete sharks
    enemies = [];

    gameOverScene.visible = true;
    gameScene.visible = false;

    calculateScore(); // make sure score is updated + get data

    if(localStorage.getItem(key) == undefined){ // if it's player's first game, store their score
        localStorage.setItem(key, score);
    }
    else if(score > localStorage.getItem(key,score)){ // if they got a high score, replace score in storage
        localStorage.setItem(key, score);
        winSound.play(); // play sound effect
    }

    highScoreLabel.text = "Your High Score: "; // refresh high score

    highScoreLabel.text += parseInt(localStorage.getItem(key)); // display high score value

    time = -1000000000000; // for troubleshooting, previously got error where timer carried over to new game
    
    // clearTimeout(timeoutID);
}


app.loader.load();