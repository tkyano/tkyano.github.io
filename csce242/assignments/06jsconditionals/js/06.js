//Based on Portia's code from js-intro
document.getElementById("toggle-nav").onclick = () => {
    document.getElementById("main-nav").classList.toggle("open");
    document.getElementById("toggle-nav").classList.toggle("triangle-up");
    document.getElementById("toggle-nav").classList.toggle("triangle-nav");
};

//Exerxse 1
document.getElementById("link-ex1").onclick = (event) => {
    const ex1 = document.getElementById("exercise1");
    ex1.style.display = "block";

    const ex2 = document.getElementById("exercise2");
    if(ex2) ex2.style.display = "none";

    const slider = document.getElementById("days-slider");
    slider.value = 1;
    slider.oninput({currentTarget: slider});
};

document.getElementById("days-slider").oninput = (event) => {
    const value = parseInt(event.currentTarget.value);

    const img = document.getElementById("plant-image");
    const daysText = document.getElementById("plant-days");
    const statusText = document.getElementById("plant-status");

                                             //Shows the 's' for plurals
    daysText.innerHTML = `It's been ${value} day${value > 1 ? 's' : ''} since watering your plant`;

    if (value <= 2) {
        img.src = "images/stage1.webp";
        statusText.innerHTML = "Your plant is healthy and happy";
    } else if (value <= 5) {
        img.src = "images/stage2.webp";
        statusText.innerHTML = "Your plant needs watering";
    } else if (value <= 9) {
        img.src = "images/stage3.jpg";
        statusText.innerHTML = "Leaves are dropping the color is changing, water soon";
    } else {
        img.src = "images/stage4.jpg";
        statusText.innerHTML = "Sorry, your plant is no longer with us";
    }

};




//Exercise 2 - https://www.w3schools.com/js/js_date_methods.asp
const updateClock = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2,"0");
    const minutes = now.getMinutes().toString().padStart(2,"0");
    document.getElementById("clock").innerHTML = `${hours}:${minutes}`;
};

// in millisectionds
setInterval(updateClock, 60000);

document.getElementById("link-ex2").onclick = (event) => {
    const ex2 = document.getElementById("exercise2");
    ex2.style.display = "block";

    const ex1 = document.getElementById("exercise1");
    if (ex1) ex1.style.display = "none";

    updateClock();
};