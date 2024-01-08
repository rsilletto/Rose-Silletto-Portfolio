// global variables
const DND_URL = "https://api.open5e.com/v1/"; 
let classData;
let raceData;
let bgData;
const CLASS_URL = DND_URL + "classes/";
const RACE_URL = DND_URL + "races/";
const BG_URL = DND_URL + "backgrounds/";
let results;
let randClass;
let randRace;
let randBG;
let classText;
let raceText;
let bgText;

const prefix = "ras5491-"; // your banjo id
const classKey = prefix + "class";
const raceKey = prefix + "race";
const bgKey = prefix + "bg";

window.onload = windowLoad;

function windowLoad(e){
    let classButton = document.querySelector("#class-button");
    let raceButton = document.querySelector("#race-button");
    let bgButton = document.querySelector("#bg-button");

    classText = document.getElementById("class-input");
    raceText = document.getElementById("race-input");
    bgText = document.getElementById("bg-input");

    url = DND_URL;

    classButton.onclick = randomClass;
    raceButton.onclick = randomRace;
    bgButton.onclick = randomBG;


    getData(CLASS_URL);
    getData(RACE_URL);
    getData(BG_URL);

    const storedClass = localStorage.getItem(classKey);
    const storedRace = localStorage.getItem(raceKey);
    const storedBG = localStorage.getItem(bgKey);

    // results = "";

    if(storedClass != ""){
        randClass = storedClass;
    }

    if(storedRace != ""){
        randRace = storedRace;
    }

    if(storedBG != ""){
        randBG = storedBG;
    }

    compileResults();

}

function getData(url){

    let xhr = new XMLHttpRequest();
    
    xhr.onload = dataLoaded;
    xhr.onerror = dataError;
    
    xhr.open("GET",url);
    xhr.send();
}

function dataLoaded(e){
    if(e.target.responseURL == CLASS_URL){
        classData = JSON.parse(e.target.responseText);
    }
    else if(e.target.responseURL == RACE_URL){
        raceData = JSON.parse(e.target.responseText);
    }
    else{
        bgData = JSON.parse(e.target.responseText);
    }
}

function dataError(e){
    console.log("There was an error!");
}

function randomClass(){
   
    randNum = Math.floor(Math.random()*classData.results.length);

    randClass = classData.results[randNum].name;

    compileResults();

}

function randomRace(){
    randNum = Math.floor(Math.random()*raceData.results.length);

    randRace = raceData.results[randNum].name;

    compileResults();
}

function randomBG(){
    randNum = Math.floor(Math.random()*bgData.results.length);

    randBG = bgData.results[randNum].name;

    compileResults();
}

function compileResults(){
    results = "";

    if(classText.value != ""){
        randClass = classText.value;
    }
    
    if(raceText.value != ""){
        randRace = raceText.value;
    }
    
    if(bgText.value != ""){
        randBG = bgText.value;
    }

    if(randClass != undefined && randClass != "undefined"){
        results += randClass + " ";
    }

    if(randRace != undefined && randRace != "undefined"){
        results += randRace + " ";
    }

    if(randBG != undefined && randBG != "undefined"){
        results += randBG;
    } 

    document.querySelector("#final-results").innerHTML = results;

    localStorage.setItem(classKey, randClass);
    localStorage.setItem(raceKey, randRace);
    localStorage.setItem(bgKey, randBG);
}
