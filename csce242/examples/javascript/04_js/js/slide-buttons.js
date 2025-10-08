document.getElementById("arrow-prev").onclick = (event) => {
    event.preventDefault();
    const currentSlide = document.querySelector("#slides img:not(.hidden)");
    const prevSlide = currentSlide.previousElementSibling;

    if (!prevSlide) {
        prevSlide = document.querySelector("#slides img:last-child");
    }
    currentSlide.classList.add("hidden");
    prevSlide.classList.remove("hidden");

}

document.getElementById("arrow-next").onclick = (event) => {
    event.preventDefault();
    const currentSlide = document.querySelector("#slides img:not(.hidden)");
    const nextSlide = currentSlide.nextElementSibling;

    if (!nextSlide) {
        nextSlide = document.querySelector("#slides img:first-child");
    }

    currentSlide.classList.add("hidden");
    nextSlide.classList.remove("hidden");
}
