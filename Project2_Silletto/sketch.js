/**
 * Rose Silletto
 * IGME-102: Project 2, 4/23/22
 * 
 */

"use strict"; //catch some common coding errors

 /* Global variables */
let array = [];

let UImgr = {};

 /**
  * setup :
  */
 function setup() {
 
  createCanvas(2400, 2000);
  background("lightblue");

  newUI();

  loadJSON("PlacesHealthLocalities.json", readLocalities);
 
 }
 
 /**
  * draw :
  */
 function draw() {
 

 }
 
 function readLocalities(local_array) {
 
  console.log("array length = " + local_array.length);

    for(let i = 1; i < local_array.length; i++){
      
      // new Locality(array[i]);
      array.push(new Locality(local_array[i]));

      // printLocality(array[i]);
    }

    updateViz();
 }
 
 function printLocality(array) {
   
  let decimal = new Intl.NumberFormat("en-us", {style:"decimal"});

  let percent = new Intl.NumberFormat({style: "percent"});

  let dollars = new Intl.NumberFormat("en-us", {style:"currency", currency: "USD"});

  console.log(array.name + ", " + array.state + " population: " + decimal.format(array.population) 
    + " => " + percent.format( 100*((array.white) / array.population)) + " percent white " + "\n"
    + percent.format(100*((array.assisted) / array.population)) + " percent recieve public assistance, with a "
    + dollars.format(array.medianIncome) + " median income " + "\n"
    + decimal.format(array.lon) + " longitude " + decimal.format(array.lat) + " latitude ");
 }
 
 function isThisASmallOne(locality) {

  return (locality.population < 10000);
 }

 function isThisABigOne(locality) {

  return (locality.population > 200000);
 }

 function isThisAWhiteOne(locality) {

  return (locality.white)/locality.population < 0.7
 }

 function updateViz() {

  background("lightblue");

  let drawn_localities = array;

  if(UImgr.pop.value() === "localities with population < 10,000") {

    console.log(UImgr.pop.value());

    drawn_localities = array.filter( isThisASmallOne );

  }
  else if(UImgr.pop.value() === "localities with population > 200,000") {
     console.log(UImgr.pop.value());

     drawn_localities = array.filter( isThisABigOne );
  }
  else if(UImgr.pop.value() === "localities with population > 30% non-white") {

    console.log(UImgr.pop.value());

    drawn_localities = array.filter( isThisAWhiteOne );
  }

  if(UImgr.data.value() === "percent white") {

    console.log(UImgr.data.value());

  }
  else if(UImgr.data.value() === "percent assisted") {

    console.log(UImgr.data.value());
  }

  showLegend();

  if(drawn_localities.length > 0) {

    for(let i = 1; i < drawn_localities.length; i++){
      
      drawn_localities[i].display(UImgr.scale.value());
    }
  }
  else{
    fill("black");
    text("Loading... ", 100, 150);
  }

  isChecked();
 }

 function isChecked() {

  if (UImgr.names.checked()) {
    
    console.log("checked");

    for(let i = 0; i < array.length; i++){
      fill("black");
      text(array[i].name, array[i].x, array[i].y);
    }
  }
  else {
    console.log("not checked");
  }
 }

 function newUI() {

  UImgr.pop = createSelect();

  UImgr.pop.option("all localities");
  UImgr.pop.option("localities with population < 10,000");
  UImgr.pop.option("localities with population > 200,000");
  UImgr.pop.option("localities with population > 30% non-white");

  UImgr.pop.selected("all localities");

  UImgr.pop.changed(updateViz);

  UImgr.data = createSelect();

  UImgr.data.option("percent white");
  UImgr.data.option("percent with cancer");
  UImgr.data.option("percent assisted, with high blood pressure");
  UImgr.data.option("percent smoking, drinking, depression");

  UImgr.data.selected("percent white");

  UImgr.data.changed(updateViz);

  UImgr.names = createCheckbox("Show names", false);
  UImgr.names.changed(isChecked);

  UImgr.scale = createSlider(1, 5.5, 1);
  UImgr.scale.changed(updateViz);

 }

 function showLegend() {
  
  fill(255, 0, 0, 50);
  rect(40, 20, 20, 40);

  let size = map(0.6, 0, 1, 0, 40); // white

  fill(0, 255, 0, 50);
  rect(40, 20, 20, size);

  fill("black");
  text("Percentage of white people in locality \n = percentage of red rectangle that is green", 100, 30);

  fill(255, 0, 0, 50);
  rect(40, 70, 20, 40);

  let size2 = map(0.5, 0, 1, 0, 40); // cancer

  fill(0, 0, 255, 50);
  rect(40, 70, 20, size2);

  fill("black");
  text("Percentage of people with cancer \n = percentage of red rectangle that is blue", 100, 80);

  fill(255, 0, 0, 50);
  rect(40, 120, 20, 40);

  let size3 = map(0.10, 0, 1, 0, 40); // assisted
            
  fill(0, 0, 255, 50);
  rect(40, 120, 10, size3);

  let size4 = map(0.20, 0, 1, 0, 40); // high blood pressure

  fill(0, 255, 0, 50);
  rect(50, 120, 10, size4);

  fill("black");
  text("Percentage of people with assistance \n = percentage of red rectangle that is blue \n Percentage of people with HBP \n = percentage of rectangle that is green", 100, 120);

  fill(255, 0, 0, 50);
  rect(40, 180, 20, 40);

  let size5 = map(0.15, 0, 1, 0, 40); // drinking
  
  fill(0, 0, 255, 50);
  rect(40, 180, (20/3), size5);

  let size6 = map(0.4, 0, 1, 0, 40); // smoking

  fill(0, 255, 0, 50);
  rect(40 +(20/3), 180, (20/3), size6);

  let size7 = map(0.2, 0, 1, 0, 40); // depression

  fill(0, 0, 255, 50);
  rect(40 +(20/3)*2, 180, (20/3), size7);

  fill("black");
  text("Percentage of people who binge drink \n = percentage of red rectangle that is blue \n Percentage of people currently smoking \n = percentage of rectangle that is green \n Percentage of people with depression \n = percentage of rectangle that is blue (right)", 100, 185);
 
}
