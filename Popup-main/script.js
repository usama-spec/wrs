const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");

function openPopup() {
    popup.classList.add("show");
    overlay.classList.add("show");
}

function closePopup() {
    popup.classList.remove("show");
    overlay.classList.remove("show");
}