const slideshow = () => {
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
    setTimeout(slideshow, 2000);
};

var slideIndex = 0;
slideshow();
