// Use camelCase for JavaScript
/*
const sayHello = () => {
    console.log("Hello World");
}

document.getElementById("btn-click-me").onclick = sayHello;
*/

document.getElementById("btn-click-me").onclick = (event) => {
    document.getElementById("p-welcome").innerHTML = "Hello World";
    event.currentTarget.classList.add("clicked"); //current target is the button that was clicked

}

// Happy Button
document.getElementById("happy-btn").onclick = () => {
    const pFeeling = document.getElementById("p-feeling");
    pFeeling.innerHTML = "I am Happy!!!";
    pFeeling.classList.add("happy");
    pFeeling.classList.remove("sad");

}

// Sad Button
document.getElementById("sad-btn").onclick = () => {
    const pFeeling = document.getElementById("p-feeling");
    pFeeling.innerHTML = "I am sad.... uhhhg!";
    pFeeling.classList.add("sad");
    pFeeling.classList.remove("");

}

// Clear Button
document.getElementById("clear-btn").onclick = () => {
    const pFeeling = document.getElementById("p-feeling");
    pFeeling.innerHTML = "";
    pFeeling.classList.remove("sad");
    pFeeling.classList.remove("happy");
}

//Emotion
document.getElementById("txt-emotion").onkeyup = (event) => {
    const userInput = event.currentTarget.value;
    document.getElementById("p-emotion").innerHTML = `You are feeling ${userInput}.`
    document.getElementById("img-emotion").classList.remove("hidden");
};
