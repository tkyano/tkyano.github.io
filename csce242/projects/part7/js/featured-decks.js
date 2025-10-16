let allCards = [];
const deckList = document.getElementById("deck-list");
const deckCountDisplay = document.getElementById("deck-count");
const exportBtn = document.getElementById("export-deck");

let currentDeckCounts = {};

let featuredDecks = [];
fetch("https://tkyano.github.io/csce242/projects/part6/json/featured-decks.json")
  .then(res => res.json())
  .then(data => {
    featuredDecks = data;
    renderFeaturedDecks();
  });



function updateDeckCount() {
    const total = Object.values(currentDeckCounts).reduce((sum, val) => sum + val, 0);
    deckCountDisplay.textContent = `(${total} cards)`;
}

function renderCardInDeck(cardData, count = 1) {
    const name = cardData.name;

    let existing = Array.from(deckList.children).find(li => li.dataset.name === name);
    if (existing) {
        currentDeckCounts[name] += count;
        existing.querySelector(".count").textContent = currentDeckCounts[name];
        updateDeckCount();
        return;
    }

    currentDeckCounts[name] = currentDeckCounts[name] || count;

    const li = document.createElement("li");
    li.classList.add("deck-card");
    li.dataset.name = name;

    const img = document.createElement("img");
    img.src = cardData.image_uris?.normal
    img.alt = name;
    img.style.width = "223px";
    img.style.height = "auto";
    img.style.display = "block";

    const countSpan = document.createElement("span");
    countSpan.classList.add("count");
    countSpan.textContent = currentDeckCounts[name];

    const btnContainer = document.createElement("div");
    btnContainer.style.display = "flex";
    btnContainer.style.justifyContent = "center";
    btnContainer.style.gap = "5px";
    btnContainer.append(countSpan);

    li.append(img, btnContainer);
    deckList.appendChild(li);
    updateDeckCount();
}

function loadDeck(deckId) {
    const deck = featuredDecks.find(d => d._id === deckId);
    if (!deck) return;

    const deckTitleElem = document.getElementById("deck-title");
    if (deckTitleElem) deckTitleElem.textContent = deck.name;

    deckList.innerHTML = "";
    currentDeckCounts = {};

    // used https://www.w3schools.com/jsref/jsref_object_entries.asp and https://www.geeksforgeeks.org/javascript/javascript-object-entries-method/
    Object.entries(deck.cards).forEach(([cardName, count]) => {
        const cardData = allCards.find(c => c.name === cardName);
        if (!cardData) {
            console.warn(`Card not found in JSON: ${cardName}`);
            return;
        }
        renderCardInDeck(cardData, count);
    });
}

if (exportBtn) {
    exportBtn.addEventListener("click", () => {
        const deckTitleElem = document.getElementById("deck-title");
        const deckJSON = JSON.stringify(currentDeckCounts, null, 2);
        // blob here: https://www.geeksforgeeks.org/javascript/javascript-blob/
        const blob = new Blob([deckJSON], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${deckTitleElem?.textContent.trim() || "deck"}.json`;
        a.click();
        URL.revokeObjectURL(url);
    });
}

fetch("json/oracle-cards.json")
    .then(resp => resp.json())
    .then(data => {
        allCards = data;

        const deckTitleElem = document.getElementById("deck-title");
        const deckId = deckTitleElem?.dataset.preset
        loadDeck(deckId);
    })
    .catch(err => console.error("Failed to load oracle JSON:", err));



function renderFeaturedDecks(containerSelector = "#featured-decks-container") {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    featuredDecks.forEach(deck => {
        const a = document.createElement("a");
        a.href = `${deck._id}.html`;
        a.classList.add("featured-deck");

        const img = document.createElement("img");
        img.src = deck.image || "images/placeholder-card.jpg";
        img.alt = deck.name;
        img.style.width = "223px"; 
        img.style.height = "auto";

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("deck-info");

        const nameP = document.createElement("p");
        nameP.textContent = deck.name;
        nameP.style.color = "var(--accent-red)";

        const descP = document.createElement("p");
        descP.textContent = deck.description;

        infoDiv.append(nameP, descP);
        a.append(img, infoDiv);
        container.appendChild(a);
    });
}

//using DOMContentLoaded: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
    const featuredContainer = document.querySelector("#featured-decks-container");
    if (featuredContainer) renderFeaturedDecks();
});