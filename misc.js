var slideIndex = 0;

const carousel = () => {
    var slides = document.getElementsByClassName("slides");

    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "inline";

    // Swaps image every 2 seconds
    setTimeout(carousel, 2000);
};

carousel();
