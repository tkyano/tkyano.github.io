setInterval(()=>{
    let currentSlide = document.querySelector("#slideshow :not(.hidden)");
    let nextSlide = currentSlide.nextElementSibling;
    if (!nextSlide) {
        nextSlide = document.querySelector("#slideshow :first-child");
    }
    currentSlide.classList.add("hidden");
    nextSlide.classList.remove("hidden");
    currentSlide = nextSlide;
}, 1000);