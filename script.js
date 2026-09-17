const buttonGenerate = document.getElementById("generate");

const buttonSix = document.getElementById("amount-of-colors-6");
const buttonEight = document.getElementById("amount-of-colors-8");
const buttonNine = document.getElementById("amount-of-colors-9");
const buttonHex = document.getElementById("hex");
const buttonHsl = document.getElementById("hsl");
const paletteContainer = document.getElementById("palette-code");


// FUNCION RANDOMIZER
function recolorAllPalettes() {
    const allSwatches = document.querySelectorAll(".palette-created");
    const allLabels = document.querySelectorAll(".hsl-value");

    for (let i = 0; i < allSwatches.length; i++) {
        const newColor = obtenerColorActual();
        allSwatches[i].style.backgroundColor = newColor;
        allLabels[i].textContent = newColor;
    }
}

//BOTON GENERATE
buttonGenerate.addEventListener("click", function () {
    recolorAllPalettes();
});

// GENERATOR HSL
function obtenerColorActual() {
       return obtenerHsl();
}


// HSL generator 
function obtenerHsl() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 100);
    const light = Math.floor(Math.random() * 100);
    return `hsl(${hue}, ${saturation}%, ${light}%)`;
}

// Clone reconciliation (grow/shrink, preserve existing colors) ----
function reconcileClones(maxClones) {
    const existingClones = Array.from(document.querySelectorAll(".palette-clone"));
    const currentCount = existingClones.length;

    if (maxClones > currentCount) {
        for (let i = currentCount; i < maxClones; i++) {
            const clone = paletteContainer.cloneNode(true);
            clone.removeAttribute("id");
            clone.classList.add("palette-clone");

            const randomColor = obtenerHsl();
            const swatch = clone.querySelector(".palette-created");
            const label = clone.querySelector(".hsl-value");

            if (swatch) swatch.style.backgroundColor = randomColor;
            if (label) label.textContent = randomColor;

            paletteContainer.parentNode.appendChild(clone);
        }
    } else if (maxClones < currentCount) {
        for (let i = currentCount - 1; i >= maxClones; i--) {
            existingClones[i].remove();
        }
    }
}


// SET UP CLONE AMOUNTS
function setupCloneButton(button, maxClones) {
    button.addEventListener("click", function () {
        reconcileClones(maxClones);
    });
}

setupCloneButton(buttonSix, 5);
setupCloneButton(buttonEight, 7);
setupCloneButton(buttonNine, 8);

// INITIAL LOAD WITH RANDOM CLONES
document.addEventListener("DOMContentLoaded", function () {
    reconcileClones(5);
    recolorAllPalettes();
});

