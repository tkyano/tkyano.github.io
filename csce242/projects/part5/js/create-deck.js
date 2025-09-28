// --- Edit Deck Title ---
const deckText = document.getElementById("deck-text");
const editIcon = document.getElementById("edit-title");

if (deckText && editIcon) {
  editIcon.addEventListener("click", () => {
    deckText.contentEditable = "true";
    deckText.focus();
  });

  // blur is when you click off the object.. it is considered to "lose focus"
  deckText.addEventListener("blur", () => {
    deckText.contentEditable = "false";
  });

  deckText.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      deckText.contentEditable = "false";
    }
  });
}

