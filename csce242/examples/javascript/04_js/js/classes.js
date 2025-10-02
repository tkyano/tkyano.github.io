class Dog {
    constructor(title, breed, color, age, size, pic) {
        this.title = title;
        this.breed = breed;
        this.color = color;
        this.age = age;
        this.size = size;
        this.pic = pic;
    }

    get item() {
        const section = document.createElement("section");
        section.classList.add("dog");

        // header
        const h3 = document.createElement("h3");
        h3.innerHTML = this.title;
        section.append(h3);
        const arrow = document.createElement("a");
        arrow.href="#"
        arrow.innerHTML = "&#x2964"
        h3.append(arrow);

        // column container
        const columnContainer = document.createElement("Div");
        columnContainer.classList.add("columns");
        section.append(columnContainer);

        // first column
        const divCol1 = document.createElement("div");
        columnContainer.append(divCol1);
        divCol1.append(this.picture(this.pic));

        // second column
        const divCol2 = document.createElement("div");
        columnContainer.append(divCol2);
        divCol2.append(this.paragraph("Breed: ", this.breed));
        divCol2.append(this.paragraph("Size: ", this.size));
        divCol2.append(this.paragraph("Age: ", this.age));
        divCol2.classList.add("transparent");

        arrow.onclick = (e) => {
            e.preventDefault();
            divCol2.classList.toggle("transparent");
        };

        return section;
    }

    picture(filename) {
        const img = document.createElement("img");
        img.src = `images/classes/${filename}`;
        return img;
    }

    paragraph(key, value) {
        const p = document.createElement("p");
        p.innerHTML = `${key} ${value}`;
        return p;
    }
}


const dogs = [];
dogs.push(new Dog("Coco", "Yorkie", "Black", 6, "small", "yorkie.jpg"));
dogs.push(new Dog("Sam", "Golden Retriever", "Yellow", 1, "med", "golden-retriever.jpg"));
dogs.push(new Dog("Gerald", "Pit Bull", "Black", 3, "large", "pitt-bull.jpg"));

// On page loaddd
const dogListDiv = document.getElementById("dog-list");

dogs.forEach((dog) => {
    dogListDiv.append(dog.item);
});
