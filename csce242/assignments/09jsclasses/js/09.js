class Painting {
    constructor(name, artist, img, frame) {
        this.name = name;
        this.artist = artist;
        this.img = img;
        this.frame = frame;
    } 

    get item() {
        const section = document.createElement("section");
        section.classList.add("col1of4");

        // Title
        const title = document.createElement("p");
        title.classList.add("title");
        title.innerText = this.name;
        section.append(title);

        // Image
        const imgEl = document.createElement("img");
        imgEl.src = `images/${this.img}`;
        imgEl.alt = this.name;
        imgEl.classList.add("painting-img");
        section.append(imgEl);

        imgEl.onclick = () => {
            const popupImg = document.getElementById("modal-img");
            popupImg.src = `images/${this.img}`;
            
            if (this.frame === "yes") {
                popupImg.classList.add("framed");
            } else {
                popupImg.classList.remove("framed");
            }

            document.getElementById("modal-title").innerText = this.name;
            document.getElementById("modal-info").innerText = `Artist: ${this.artist}`;
            document.getElementById("popup").classList.remove("hidden");
        };

        return section;
    }
}

const paintings = [];
paintings.push(new Painting("The Japanese Footbridge", "Claude Monet", "image1.jpg", "yes"));
paintings.push(new Painting("Flowers in a Rococo Vase", "Paul Cezanne", "image2.jpg", "no"));
paintings.push(new Painting("Tropical Forest with Monkeys", "Henri Rousseau", "image3.jpg", "yes"));
paintings.push(new Painting("Self-Portrait", "Vincent van Gogh", "image4.jpg", "no"));
paintings.push(new Painting("White Poodle in a Punt", "George Stubbs", "image5.jpg", "no"));

window.onload = () => {
    const container = document.getElementById("painting-gallery");
    paintings.forEach(p => {
        container.append(p.item);
    });

    document.getElementById("close").onclick = () => {
        document.getElementById("popup").classList.add("hidden");
    };
};
