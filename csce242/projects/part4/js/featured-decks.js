let allCards = [];
const deckList = document.getElementById("deck-list");
const deckCountDisplay = document.getElementById("deck-count");
const exportBtn = document.getElementById("export-deck");

let currentDeckCounts = {};

// featued decks
// this is the syntax for json files
const featuredDecks = [
    {
        id: "ashling",
        name: "Ashling Storm",
        image: "images/ashling.jpg", 
        description: "A fast red deck with burn and discard",
        cards: {
            "Abrade": 1,
            "Arcane Bombardment": 1,
            "Arcane Signet": 1,
            "Aria of Flame": 1,
            "Ashling, Flame Dancer": 1,
            "Basilisk Collar": 1,
            "Blasphemous Act": 1,
            "Bolt Bend": 1,
            "Brash Taunter": 1,
            "Cathartic Pyre": 1,
            "Chandra, Hope's Beacon": 1,
            "Chandra, Torch of Defiance": 1,
            "Chandra, Torch of Defiance Emblem": 1,
            "Chandra's Incinerator": 1,
            "Chaos Warp": 1,
            "Comet Storm": 1,
            "Conspiracy Theorist": 1,
            "Containment Construct": 1,
            "Coruscation Mage": 1,
            "Crackling Spellslinger": 1,
            "Demand Answers": 1,
            "Display of Power": 1,
            "Double Vision": 1,
            "Dragon": 1,
            "Dual Casting": 1,
            "Dual Strike": 1,
            "Electrodominance": 1,
            "Elemental": 1,
            "Empty the Warrens": 1,
            "Erebor Flamesmith": 1,
            "Evolving Wilds": 1,
            "Faithless Looting": 1,
            "Faithless Salvaging": 1,
            "Festival of Embers": 1,
            "Fiery Inscription": 1,
            "Fire Diamond": 1,
            "Firebrand Archer": 1,
            "Flare of Duplication": 1,
            "Goblin": 1,
            "Gorgon's Head": 1,
            "Grafted Exoskeleton": 1,
            "Grapeshot": 1,
            "Gratuitous Violence": 1,
            "Guttersnipe": 1,
            "Increasing Vengeance": 1,
            "Inti, Seneschal of the Sun": 1,
            "Jaya Ballard": 1,
            "Jaya Ballard Emblem": 1,
            "Lightning Bolt": 1,
            "Magus of the Wheel": 1,
            "Mizzix's Mastery": 1,
            "Mountain": 34,
            "Neheb, the Eternal": 1,
            "Overmaster": 1,
            "Past in Flames": 1,
            "Powerbalance": 1,
            "Pyromancer's Goggles": 1,
            "Repeated Reverberation": 1,
            "Repercussion": 1,
            "Return the Favor": 1,
            "Reverberate": 1,
            "Rite of the Dragoncaller": 1,
            "Rodeo Pyromancers": 1,
            "Ruby Medallion": 1,
            "Runaway Steam-Kin": 1,
            "Sol Ring": 1,
            "Storm King's Thunder": 1,
            "Storm-Kiln Artist": 1,
            "Sunspine Lynx": 1,
            "Tempt with Mayhem": 1,
            "Terramorphic Expanse": 1,
            "Thrill of Possibility": 1,
            "Torbran, Thane of Red Fell": 1,
            "Twinferno": 1,
            "Virtue of Courage // Embereth Blaze": 1,
            "Wild Magic Surge": 1,
            "Wild Ricochet": 1,
            "Young Pyromancer": 1
        }
    },
    {
        id: "clement",
        name: "Clement Frogs",
        image: "images/clement.webp",
        description: "A Simic frog tribal deck with ramp and draw",
        cards: {
            "Aether Channeler": 1,
            "Aeve, Progenitor Ooze": 1,
            "Alchemist's Refuge": 1,
            "Amphibian Downpour": 1,
            "Arboreal Grazer": 1,
            "Arcane Denial": 1,
            "Arcane Signet": 1,
            "Barrin, Tolarian Archmage": 1,
            "Bellowing Crier": 1,
            "Biomass Mutation": 1,
            "Brainstorm": 1,
            "Clement, the Worrywort": 1,
            "Clifftop Lookout": 1,
            "Command Tower": 1,
            "Communal Brewing": 1,
            "Counterspell": 1,
            "Cultivate": 1,
            "Displace": 1,
            "Distant Melody": 1,
            "Dour Port-Mage": 1,
            "Dreamdew Entrancer": 1,
            "Drown in Dreams": 1,
            "Elvish Visionary": 1,
            "Eternal Witness": 1,
            "Explore": 1,
            "Finale of Revelation": 1,
            "Forest": 14,
            "Frogify": 1,
            "Ghostly Flicker": 1,
            "Gossip's Talent": 1,
            "Grolnok, the Omnivore": 1,
            "Guardian Gladewalker": 1,
            "Intruder Alarm": 1,
            "Island": 15,
            "Lightning Greaves": 1,
            "Lilysplash Mentor": 1,
            "Long River Lurker": 1,
            "Long River's Pull": 1,
            "Mana Reflection": 1,
            "Murkfiend Liege": 1,
            "Nyxborn Hydra": 1,
            "Oakhollow Village": 1,
            "Omniscience": 1,
            "Oran-Rief, the Vastwood": 1,
            "Panharmonicon": 1,
            "Paradoxical Outcome": 1,
            "Path of Ancestry": 1,
            "Peregrine Drake": 1,
            "Plaxcaster Frogling": 1,
            "Polymorphist's Jest": 1,
            "Pond Prophet": 1,
            "Ponder": 1,
            "Portent of Calamity": 1,
            "Rampant Growth": 1,
            "Rapid Hybridization": 1,
            "Reclamation Sage": 1,
            "Reflecting Pool": 1,
            "Reflections of Littjara": 1,
            "Rhonas's Monument": 1,
            "Simic Charm": 1,
            "Skyskipper Duo": 1,
            "Sol Ring": 1,
            "Splash Lasher": 1,
            "Splash Portal": 1,
            "Spore Frog": 1,
            "Sprouting Vines": 1,
            "Sunshower Druid": 1,
            "Three Tree Scribe": 1,
            "Treeguard Duo": 1,
            "Valley Mightcaller": 1,
            "Venser, Shaper Savant": 1,
            "Virtue of Knowledge // Vantress Visions": 1,
            "Weather the Storm": 1
        }
    }
];

function updateDeckCount() {
    const total = Object.values(currentDeckCounts).reduce((sum, val) => sum + val, 0);
    deckCountDisplay.textContent = `(${total} cards)`;
}

function renderCardInDeck(cardData, count = 1) {
    const name = cardData.name;

    // Check if card is already in deck
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

// --- Load Deck from Featured Deck Data ---
function loadDeck(deckId) {
    const deck = featuredDecks.find(d => d.id === deckId);
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

// --- Export Deck ---
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
        a.href = `${deck.id}.html`;
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