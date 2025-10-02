const getShoes = async() => {
    const url = "https://portiaportia.github.io/json/shoes.json";

    try {
        const response = await fetch(url); // need to await so that the site is not populated blank
        return response.json();

    }
    catch(error){
        console.log("sorry bub");
    }
};

const showShoes = async() => { 
    const shoes =  await getShoes();
    const shoeListDiv = document.getElementById("shoe-list");
    
    shoes.forEach((shoe)=>{
        const section = document.createElement("section");  
        section.classList.add("shoe");

        //h3
        const h3 = document.createElement("h3");
        section.append("h3");
        h3.innerHTML = shoe.name;
        shoeListDiv.append(shoe.name);

        //brand
        const p = document.createElement("p");
        section.append(p);
        p.innerHTML = `Brand: ${shoe.brand}`;

        //loop through reviews anf make ul li list
        const ul = document.createElement("ul");
        section.append(ul);

        shoe.review.forEach((review) => {
            const li = document.createElement("li");
            li.innerHTML = review;
            ul.append(li);
        });

        //img
        //const img = document.createElement("img");
        //section.append(img);
        //img.src = `https://portiaportia.github.io/json/shoes.json/${shoe.img}`;

        shoeListDiv.append(section);

    });
};

showShoes();
