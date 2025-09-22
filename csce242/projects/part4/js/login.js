// started with the html and js portion from w3schoosl here: https://www.w3schools.com/howto/howto_css_login_form.asp
const toggleNav = document.getElementById("toggle-nav");
if (toggleNav) {
    toggleNav.onclick = () => {
        const mainNav = document.getElementById("main-nav");
        if (mainNav) mainNav.classList.toggle("open");
    };
}

const loginForm = document.getElementById("loginForm");
const logoutContainer = document.getElementById("logout-container");
const logoutBtn = document.getElementById("logoutBtn");
const loginNavLink = document.querySelector('a[href="login.html"]');

const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

if (isLoggedIn) {
    if (loginForm) loginForm.style.display = "none";
    if (logoutContainer) logoutContainer.style.display = "block";
    if (loginNavLink) {
        loginNavLink.textContent = "Logout";
        loginNavLink.href = "#";
        loginNavLink.addEventListener("click", () => {
            localStorage.removeItem("isLoggedIn");
            location.reload();
        });
    }
} else {
    if (loginForm) loginForm.style.display = "block";
    if (logoutContainer) logoutContainer.style.display = "none";
}

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (email === "user@example.com" && password === "password123") {
            localStorage.setItem("isLoggedIn", "true");
            alert("Login Successful!");
            location.reload();
        } else {
            alert("Invalid email or password.");
        }
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("isLoggedIn");
        location.reload();
    });
}

const decksContent = document.getElementById("my-decks-content");
const loginPlaceholder = document.getElementById("login-placeholder");

if (decksContent && loginPlaceholder) {
    if (isLoggedIn) {
        decksContent.style.display = "flex";
        loginPlaceholder.style.display = "none";
    } else {
        decksContent.style.display = "none";
        loginPlaceholder.style.display = "flex";
    }
}
