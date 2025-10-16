//redirect the input from the hompage search bar and bring the user to browse-cards.html, and put their input in the search bar there to find the cards they are looking for

const searchInput = document.getElementById("search-cards");

if (searchInput) {
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const query = encodeURIComponent(searchInput.value.trim());
            if (query) {
                window.location.href = `browse-cards.html?search=${query}`;
            }
        }
    });
}