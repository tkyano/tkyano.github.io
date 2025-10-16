document.getElementById("contact-form").onsubmit = (event) => {
    event.preventDefault();

    const result = document.getElementById("contact-result");
    const formData = new FormData(event.currentTarget);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    // Loading message
    result.innerHTML = "Please wait...";

    
};