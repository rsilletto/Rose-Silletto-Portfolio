// global variables
let obj;
let results;
let para;
let datatype;   
const DND_URL = "https://api.open5e.com/v1/";  



function getData(url){

    let xhr = new XMLHttpRequest();
    
    xhr.onload = dataLoaded;
    xhr.onerror = dataError;
    
    xhr.open("GET",url);
    xhr.send();
}
    
// Callback Functions
    
function dataLoaded(e){
    
    let xhr = e.target;
    console.log(xhr);
    
    para = document.createElement("p");
    
    // para.innerHTML = xhr.responseText;

    obj = JSON.parse(xhr.responseText);
    console.log(obj);

    results = obj.results;
    
    console.log()
    /*
    console.log(results);
    console.log(results[0]);
    // console.log(results[0].desc);
    */
    para.innerHTML = "Results here";
    
    document.getElementById("class-results").appendChild(para);  

}
    
function dataError(e){
    console.log("An error occurred");
}
    
// data retrieval


function randomClass(){
    let url = DND_URL;

    datatype = "class";

    url += "classes/";

    getData(url);
    
    randNum = Math.floor(Math.random()*10);

    let para = document.querySelector("div");

    para.innerHTML = results[randNum].name;
}

function windowLoad(){
    let classButton = document.querySelector("#class-button");
    url = DND_URL;

    classButton.onclick = randomClass;

    
    //getData(url);
    
}

window.onload = windowLoad;

