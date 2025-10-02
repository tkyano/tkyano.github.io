const deckTitle = document.getElementById("deck-title");
const presetName = deckTitle.dataset.preset || "starter"; // fallback to starter if none

// --- Editable Deck Title ---
const deckText = document.getElementById("deck-text");
const editIcon = document.getElementById("edit-title");

editIcon.addEventListener("click", () => {
    deckText.contentEditable = "true";
    deckText.focus();
});

deckText.addEventListener("blur", () => {
    deckText.contentEditable = "false";
});

deckText.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        deckText.contentEditable = "false";
    }
});

// --- Deck elements ---
const deckList = document.getElementById("deck-list");
const deckCountDisplay = document.getElementById("deck-count");
const clearBtn = document.getElementById("clear-deck");
const exportBtn = document.getElementById("export-deck");
const importBtn = document.getElementById("import-deck");
const fileInput = document.getElementById("file-input");

// --- Search elements ---
const searchBox = document.getElementById("card-search-input");
const resultsContainer = document.getElementById("card-results");

// --- Deck Data ---
let allCards = [];
let deckCounts = {};

// --- Preset Decks ---
const presetDecks = {
    "starter": [
        "Island", "Mountain", "Forest", "Plains", "Swamp",
        "Llanowar Elves", "Lightning Bolt", "Giant Growth", "Serra Angel", "Counterspell",
        "Dark Ritual", "Shivan Dragon", "Swords to Plowshares", "Giant Spider", "Cancel",
        "Fog", "Terror", "Wall of Omens", "Fireball", "Air Elemental"
    ],
    "aggro": [
        "Lightning Bolt", "Goblin Guide", "Monastery Swiftspear", "Lava Spike", "Chain Lightning",
        "Eidolon of the Great Revel", "Rift Bolt", "Skewer the Critics", "Searing Blaze", "Goblin Bushwhacker",
        "Chandra, Torch of Defiance", "Boros Charm", "Hammer of Purphoros", "Fanatical Firebrand", "Fireblast",
        "Mountain", "Mountain", "Mountain", "Mountain", "Mountain"
    ],
    "chaos": [
        "Chaos Warp", "Scrambleverse", "Warp World", "Planar Chaos", "Fiery Gambit",
        "Mindmoil", "Grip of Chaos", "Possibility Storm", "Sins of the Past", "Game of Chaos",
        "Wild Ricochet", "Shatterstorm", "Sudden Disappearance", "Kaleidoscopic Lens", "Opalescence",
        "Island", "Mountain", "Forest", "Plains", "Swamp"
    ],
    "control": [
        "Counterspell", "Sphinx's Revelation", "Supreme Verdict", "Mana Leak", "Fact or Fiction",
        "Dissolve", "Wrath of God", "Cyclonic Rift", "Negate", "Azorius Charm",
        "Teferi, Hero of Dominaria", "Path to Exile", "Snapcaster Mage", "Think Twice", "Vedalken Shackles",
        "Island", "Island", "Plains", "Plains", "Island"
    ],
    "midrange": [
        "Tarmogoyf", "Dark Confidant", "Kitchen Finks", "Liliana of the Veil", "Murderous Rider",
        "Mosswort Bridge", "Noble Hierarch", "Scavenging Ooze", "Abrupt Decay", "Bloodbraid Elf",
        "Deathrite Shaman", "Lingering Souls", "Thoughtseize", "Inquisition of Kozilek", "Huntmaster of the Fells",
        "Forest", "Forest", "Swamp", "Swamp", "Plains"
    ],
    "monobase": [
        "Llanowar Elves", "Llanowar Elves", "Llanowar Elves", "Elvish Mystic", "Elvish Visionary",
        "Heritage Druid", "Nettle Sentinel", "Priest of Titania", "Wirewood Symbiote", "Imperious Perfect",
        "Ezuri, Renegade Leader", "Archdruid of Lore", "Elvish Archdruid", "Sylvan Messenger", "Steel Leaf Champion",
        "Forest", "Forest", "Forest", "Forest", "Forest"
    ],

    "new": [],
    "mono-red-burn": [
        "Lightning Bolt", "Shock", "Chandra, Torch of Defiance", "Lava Spike", "Skewer the Critics",
        "Searing Blaze", "Boros Charm", "Goblin Guide", "Monastery Swiftspear", "Fireblast",
        "Eidolon of the Great Revel", "Rift Bolt", "Fanatical Firebrand", "Chandra's Phoenix", "Dragon Fodder",
        "Chain Lightning", "Incinerate", "Flame Rift", "Burning-Tree Emissary", "Magma Jet"
    ],
    "blue-red-spells": [
        "Opt", "Izzet Charm", "Lightning Strike", "Brainstorm", "Ponder",
        "Remand", "Counterflux", "Electrolyze", "Impulse", "Niv-Mizzet, Parun",
        "Sivvi's Ruse", "Ral, Izzet Viceroy", "Firemind's Research", "Arcane Denial", "Wizard's Retort",
        "Steam Vents", "Island", "Mountain", "Goblin Electromancer", "Saheeli, Sublime Artificer"
    ],
    "white-blue-bounce": [
        "Unsummon", "Voyage's End", "Azorius Charm", "Snap", "Frost Titan",
        "Teferi, Hero of Dominaria", "Wall of Omens", "Reflector Mage", "Detention Sphere", "Supreme Verdict",
        "Sphinx of the Final Word", "Mystic Gate", "Plains", "Island", "Azorius Signet",
        "Cloudshift", "Sublime Archangel", "Sea Gate Oracle", "Guardian of the Guildpact", "Absorb"
    ],
    "blue-control": [
        "Counterspell", "Brainstorm", "Sphinx's Revelation", "Mana Leak", "Dissolve",
        "Negate", "Snapcaster Mage", "Jace, the Mind Sculptor", "Fact or Fiction", "Cyclonic Rift",
        "Azorius Charm", "Force of Will", "Cryptic Command", "Teferi, Hero of Dominaria", "Mystic Sanctuary",
        "Island", "Island", "Island", "Island", "Island"
    ],
    "green-creature-ramp": [
        "Llanowar Elves", "Ghalta, Primal Hunger", "Rishkar, Peema Renegade", "Elvish Mystic", "Nissa, Who Shakes the World",
        "Scavenging Ooze", "Carnage Tyrant", "Beast Whisperer", "Steel Leaf Champion", "Regal Force",
        "Colossal Dreadmaw", "Nissa's Pilgrimage", "Overrun", "Sakura-Tribe Elder", "Sylvan Caryatid",
        "Forest", "Forest", "Forest", "Forest", "Forest"
    ]
};

// --- Update total deck count display ---
function updateDeckCount() {
    const total = Object.values(deckCounts).reduce((sum, val) => sum + val, 0);
    deckCountDisplay.textContent = `(${total} cards)`;
}

// --- Render a card in deck ---
function renderCardInDeck(cardData) {
    const name = cardData.name;

    const existing = Array.from(deckList.children).find(li => li.dataset.name === name);
    if (existing) {
        deckCounts[name]++;
        existing.querySelector(".count").textContent = deckCounts[name];
        updateDeckCount();
        return;
    }

    deckCounts[name] = deckCounts[name] || 1;

    const li = document.createElement("li");
    li.classList.add("deck-card");
    li.dataset.name = name;

    const img = document.createElement("img");
    img.src = cardData.image_uris.normal;
    img.style.width = "223px";
    img.style.height = "auto";
    img.style.display = "block";

    const countSpan = document.createElement("span");
    countSpan.classList.add("count");
    countSpan.textContent = deckCounts[name];

    const addBtn = document.createElement("button");
    addBtn.textContent = "+";
    addBtn.addEventListener("click", () => {
        deckCounts[name]++;
        countSpan.textContent = deckCounts[name];
        updateDeckCount();
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "-";
    removeBtn.addEventListener("click", () => {
        if (deckCounts[name] > 1) {
            deckCounts[name]--;
            countSpan.textContent = deckCounts[name];
        } else {
            deckCounts[name] = 0;
            li.remove();
        }
        updateDeckCount();
    });

    const btnContainer = document.createElement("div");
    btnContainer.style.display = "flex";
    btnContainer.style.justifyContent = "center";
    btnContainer.style.gap = "5px";
    btnContainer.append(addBtn, removeBtn, countSpan);

    li.append(img, btnContainer);
    deckList.appendChild(li);
    updateDeckCount();
}

// bring in onee of the prest decks by pputting it inthe html
function renderPresetDeck(preset) {
    const cardNames = presetDecks[preset];
    if (!cardNames) return;

    cardNames.forEach(name => {
        const cardData = allCards.find(c => c.name === name && c.image_uris);
        if (!cardData) return;
        renderCardInDeck(cardData);
    });
}

// --- Fetch all cards ---
fetch("json/oracle-cards.json")
    .then(resp => resp.json())
    .then(data => {
        allCards = data;
        renderPresetDeck(presetName);
    })
    .catch(err => console.error(err));

// --- Clear Deck ---
clearBtn.addEventListener("click", () => {
    deckCounts = {};
    deckList.innerHTML = "";
    updateDeckCount();
});

// --- Export Deck ---
exportBtn.addEventListener("click", () => {
    const deckJSON = JSON.stringify(deckCounts, null, 2);
    const blob = new Blob([deckJSON], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${deckText.textContent.trim() || "deck"}.json`;
    a.click();
    URL.revokeObjectURL(url);
});

// --- Import Deck ---
importBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const importedDeck = JSON.parse(e.target.result);

            deckCounts = {};
            deckList.innerHTML = "";

            Object.keys(importedDeck).forEach(name => {
                const cardData = allCards.find(c => c.name === name && c.image_uris);
                if (!cardData) return;
                for (let i = 0; i < importedDeck[name]; i++) {
                    renderCardInDeck(cardData);
                }
            });
        } catch (err) {
            alert("Invalid JSON file");
            console.error(err);
        }
    };
    reader.readAsText(file);
});

// --- Search Cards ---
searchBox.addEventListener("keypress", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();

    const query = searchBox.value.toLowerCase();
    const filtered = allCards.filter(card => card.name && card.name.toLowerCase().includes(query));

    resultsContainer.innerHTML = ""; // clear previous results

    filtered.slice(0, 20).forEach(card => {
        if (!card.image_uris) return;

        const cardDiv = document.createElement("div");
        cardDiv.classList.add("search-card"); // use CSS

        const img = document.createElement("img");
        img.src = card.image_uris.normal;

        const addBtn = document.createElement("button");
        addBtn.textContent = "Add";
        addBtn.classList.add("deck-action-btn");
        addBtn.addEventListener("click", () => {
            deckCounts[card.name] = (deckCounts[card.name] || 0) + 1;
            renderCardInDeck(card);
        });

        cardDiv.append(img, addBtn);
        resultsContainer.appendChild(cardDiv);
    });
});

// Hide search results when clicking off the search box
searchBox.addEventListener("blur", () => {
    setTimeout(() => {
        resultsContainer.innerHTML = "";
    }, 100);
});

// Close search results when pressing Escape
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        resultsContainer.innerHTML = "";
        searchBox.blur();
    }
});