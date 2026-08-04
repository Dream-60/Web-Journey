const floatingButton = document.getElementById("floating-button");

window.addEventListener("scroll", function () {

    if (window.scrollY > 0) {
        floatingButton.classList.add("show");
    }

    if (window.scrollY === 0) {
        floatingButton.classList.remove("show");
    }

});

floatingButton.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('copy', function(e) {
    e.preventDefault();
});

document.addEventListener('cut', function(e) {
    e.preventDefault();});