window.onload = () => {
    const beforePics = [];
    const afterPics = [];

    beforePics["Joey"] = "images/before1.png";
    beforePics["Max"] = "images/before2.png";
    beforePics["Zuko"] = "images/before3.png";
    beforePics["Luna"] = "images/before4.png";

    afterPics["Joey"] = "images/after1.png";
    afterPics["Max"] = "images/after2.png";
    afterPics["Zuko"] = "images/after3.png";
    afterPics["Luna"] = "images/after4.png";

    const container = document.getElementById("array-examples");
    container.innerHTML = "";

    for (let name in beforePics) {
        const dogDiv = document.createElement("div");
        dogDiv.className = "col1of4";

        const img = document.createElement("img");
        img.src = beforePics[name];
        img.alt = `${name} before adoption`;
        img.style.width = "250px";   
        img.style.height = "250px";
        img.style.objectFit = "cover";

        const adoptText = document.createElement("p");
        adoptText.className = "hidden";
        adoptText.innerText = `Please adopt ${name}`;

        //mouse entering and leaving info from: https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event
        img.addEventListener("mouseenter", () => {
            adoptText.classList.remove("hidden");
        });

        img.addEventListener("mouseleave", () => {
            adoptText.classList.add("hidden");
        });

        img.onclick = () => {
            document.getElementById("popup-title").innerText = `${name} after adoption`;
            document.getElementById("popup-img").src = afterPics[name];
            document.getElementById("popup").classList.remove("hidden");
        };

        dogDiv.appendChild(img);
        dogDiv.appendChild(adoptText);
        container.appendChild(dogDiv);
    }

    document.getElementById("close").onclick = () => {
        document.getElementById("popup").classList.add("hidden");
    };
};
