const numeroRBG = document.getElementById("generate");

const count = document.getElementsByClassName("palette-created");
const hslValue = document.getElementsByClassName("hsl-value");

const buttonSix = document.getElementById("amount-of-colors-6");
const buttonEight = document.getElementById("amount-of-colors-8");
const buttonNine = document.getElementById("amount-of-colors-9");
const paletteContainer = document.getElementById("palette-code");


// starting web
function initClones(maxClones) {
    document.querySelectorAll(".palette-clone").forEach(el => el.remove());

    for (let i = 0; i < maxClones; i++) {
        const clone = paletteContainer.cloneNode(true);
        clone.removeAttribute("id");
        clone.classList.add("palette-clone");

        paletteContainer.parentNode.appendChild(clone);
    }
}

// Run automatically once the page loads
document.addEventListener("DOMContentLoaded", function () {
    initClones(5);
});

// HSL ON START
function obtenerHsl() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 100);
    const light = Math.floor(Math.random() * 100);

    return `hsl(${hue}, ${saturation}%, ${light}%)`;
}

function initRandomColors() {
    for (let i = 0; i < count.length; i++) {
        const newColor = obtenerHsl();

        count[i].style.backgroundColor = newColor;
        hslValue[i].textContent = newColor;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    initRandomColors();
});