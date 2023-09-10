"use strict";

function addElement(){
    const ul= document.getElementById("meineUL");
    const li = document.createElement("li");
    var x = document.getElementById("textfeld").value;
    li.innerHTML = x;
    ul.appendChild(li);
}