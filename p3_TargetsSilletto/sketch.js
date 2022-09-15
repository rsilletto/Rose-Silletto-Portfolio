/**
 * Rose Silletto
 * IGME-101: Project 3, 11/23/21
 * Creates divers that move across canvas based on user interaction
 *  and plastic objects that interact with the divers
 */

"use strict"; //catch some common coding errors

/* global variables */

let diver1; // instances of Diver class
let diver2;

let plasticArray = []; // declares plastic array

function preload(){

}

/**
 * setup :
 */
function setup() {
   createCanvas(600, 600);
   background("aqua");

   diver1 = new Diver(100, 100, "purple", 65, 68, 87, 83);
   diver2 = new Diver(250, 200, "red", LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW);
   
   for(let i = 0; i < 10; i++)
   { plasticArray[i] = new Plastic(random(20, 550), random(20, 550), color(random(1, 255), random(1, 255), random(1, 255))); }

}

/**
 * draw :
 */
function draw() {
   
   background("aqua");

   diver1.display(); // calls Diver methods from class script
   diver2.display();

   diver1.move();
   diver2.move();

   diver1.updateState();
   diver2.updateState();

   for(let i = 0; i < 10; i++) // displays 10 plastic objects
   { 
      plasticArray[i].display();
      diver1.within(plasticArray[i]);
      diver2.within(plasticArray[i]);
   }

}

function doubleClicked() { // sets diver state when mouse is double-clicked

   diver1.setState(3);
   diver2.setState(3);
   console.log("hello");
}
