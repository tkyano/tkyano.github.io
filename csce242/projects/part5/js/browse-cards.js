// --- Search & Filter Cards ---
const searchBox = document.getElementById("card-search");
const resultsContainer = document.querySelector(".card-grid");
const costOp = document.getElementById("cost-operator");
const costVal = document.getElementById("cost-value");
const colorCheckboxes = document.querySelectorAll(".filter-group:nth-of-type(1) input[type=checkbox]");
const typeCheckboxes = document.querySelectorAll(".filter-group:nth-of-type(3) input[type=checkbox]");

let allCards = [];

// Fetch all cards once
// https://www.w3schools.com/js/js_api_fetch.asp
fetch("json/oracle-cards.json")
  .then(resp => resp.json())
  .then(data => {
    allCards = data;
  })
  .catch(err => console.error(err));

function applyFilters() {
  const query = searchBox.value.toLowerCase();

  let filtered = allCards.filter(card => {
    // name filter
    if (query && !card.name.toLowerCase().includes(query)) {
      return false;
    }

    // cost filter
    const costNumber = parseInt(costVal.value);
    if (!isNaN(costNumber)) {
      if (costOp.value === "=" && card.cmc !== costNumber) return false;
      if (costOp.value === "<" && card.cmc >= costNumber) return false;
      if (costOp.value === ">" && card.cmc <= costNumber) return false;
    }

    // color filter
    const checkedColors = [...colorCheckboxes]
      .filter(cb => cb.checked)
      .map(cb => cb.parentElement.textContent.trim());

    if (checkedColors.length > 0) {
      if (!checkedColors.some(c => card.color_identity?.includes(c[0].toUpperCase()))) {
        return false;
      }
    }

    // type filter
    const checkedTypes = [...typeCheckboxes]
      .filter(cb => cb.checked)
      .map(cb => cb.parentElement.textContent.trim());

    if (checkedTypes.length > 0) {
      if (!checkedTypes.some(t => card.type_line.includes(t))) {
        return false;
      }
    }

    return true;
  });

  // slice from https://www.w3schools.com/jsref/jsref_slice_array.asp
  resultsContainer.innerHTML = "";
  filtered.slice(0, 20).forEach(card => {
    if (card.image_uris && card.image_uris.normal) {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");

      const img = document.createElement("img");
      img.src = card.image_uris.normal;
      img.style.width = "100%";
      img.style.borderRadius = "12px";

      cardDiv.appendChild(img);
      resultsContainer.appendChild(cardDiv);
    }
  });
}

// Hook up events
if (searchBox) {
  searchBox.addEventListener("keypress", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      applyFilters();
    }
  });
}
if (costOp) costOp.addEventListener("change", applyFilters);
if (costVal) costVal.addEventListener("input", applyFilters);
colorCheckboxes.forEach(cb => cb.addEventListener("change", applyFilters));
typeCheckboxes.forEach(cb => cb.addEventListener("change", applyFilters));



// hoe to use DOMContentLoaded: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("search");

    if (query) {
        const searchInput = document.getElementById("card-search"); // meeded this card-search to matchthe browse-cards.html and not the index where we are getting the input from
        if (searchInput) {
            searchInput.value = query;

            const event = new Event("input", { bubbles: true });
            searchInput.dispatchEvent(event);
        }
    }
});