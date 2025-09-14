// Sunny Timse
document.getElementById("sunny-times").onclick = (event) => {
    const lineOne = document.getElementById("line-1");
    const lineTwo = document.getElementById("line-2");
    const lineThree = document.getElementById("line-3");
    const lineFour = document.getElementById("line-4");
    const lineFive = document.getElementById("line-5");
    //console.log("clickeed");

    lineOne.innerHTML = "Here comes the sun";
    lineTwo.innerHTML = "Sun";
    lineThree.innerHTML = "Sun";
    lineFour.innerHTML = "Sun";
    lineFive.innerHTML = "Here it comes";

    lineOne.classList.add("indent-0");
    lineTwo.classList.add("indent-1");
    lineThree.classList.add("indent-2");
    lineFour.classList.add("indent-3");
    lineFive.classList.add("indent-0");
};

//Color Picker
document.getElementById("color-input").oninput = (event) => {
    const colorText = document.getElementById("color-text");
    const colorCode = document.getElementById("color-code");
    const selectedColor = event.currentTarget.value;

    colorText.style.color = selectedColor;
    colorCode.textContent = `Selected hex color code: ${selectedColor}`;
    colorCode.style.color = selectedColor;
};


//Image Changer
document.getElementById("img-change").onclick = () => {
    const imgElement = document.getElementById("img-change");
    const sunImg = "images/sun.png";
    //console.log("test test");
    imgElement.src = sunImg;
};