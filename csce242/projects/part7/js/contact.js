document.getElementById("contact-form").onsubmit = (event) => {
    event.preventDefault();

    const result = document.getElementById('contact-result');
    const form = event.currentTarget;
    const formData = new FormData(form);
    const object = Object.fromEntries(formData.entries());
    const json = JSON.stringify(object);

    result.innerHTML = "Please wait...";

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        let json = await response.json();
        if (response.status === 200) {
            result.innerHTML = "Email Sent Successfully!";
        } else {
            result.innerHTML = `${json.message}`;
        }
    })
    .catch((error) => {
        console.error(error);
        result.innerHTML = "Something went wrong!";
    })
    .finally(() => {
        form.reset();
        setTimeout(() => {
            result.innerHTML = "";
        }, 3000);
    });
};
