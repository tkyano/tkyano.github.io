const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
const decksContent = document.getElementById("my-decks-content");
const loginPlaceholder = document.getElementById("login-placeholder");

if (isLoggedIn) {
    decksContent.style.display = "flex";
    loginPlaceholder.style.display = "none";
} else {
    decksContent.style.display = "none";
    loginPlaceholder.style.display = "flex";
}