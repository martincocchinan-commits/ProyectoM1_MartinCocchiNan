const buttonGenerate = document.getElementById("create");

const buttonSix = document.getElementById("amount-of-colors-6");
const buttonEight = document.getElementById("amount-of-colors-8");
const buttonNine = document.getElementById("amount-of-colors-9");
const paletteContainer = document.getElementById("palette-code");
const paletteGrid = document.getElementById("palette-container"); // the actual grid wrapper
const CopyHex = document.getElementsByClassName("palette-created");
const toast = document.getElementById("toast-copied");

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


let currentMode = "hsl"; // default starting mode

// BUTTON TOGGLE
const buttonMode = document.getElementById("button-mode");

// sync initial visual state to match currentMode
buttonMode.classList.toggle("hsl-active", currentMode === "hsl");

buttonMode.addEventListener("click", function () {
    currentMode = currentMode === "hex" ? "hsl" : "hex";
    buttonMode.classList.toggle("hsl-active", currentMode === "hsl");
    reformatAllPalettes(currentMode);
});

// generators used ONLY by the generate button / new clones

// GENERATOR HEX 
function obtenerHex() {
    const randomInt = Math.floor(Math.random() * 0xffffff);
    return `#${randomInt.toString(16).padStart(6, '0')}`;
}

// GENERATOR HSL
function obtenerColorActual() {
    return currentMode === "hex" ? obtenerHex() : obtenerHsl();
}

// HEX HSL CONVERTERS

// ---- conversion helpers: reformat an EXISTING color, don't randomize ----
function rgbStringToHex(rgbString) {
    const match = rgbString.match(/\d+/g);
    if (!match) return rgbString;
    const [r, g, b] = match.map(Number);
    const toHex = x => x.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbStringToHsl(rgbString) {
    const match = rgbString.match(/\d+/g);
    if (!match) return rgbString;
    let [r, g, b] = match.map(Number);
    r /= 255; g /= 255; b /= 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `hsl(${h}, ${s}%, ${l}%)`;
}


// REFORMAT PALETTES TO HEX OR HSL
function reformatAllPalettes(mode) {
    const allSwatches = document.querySelectorAll(".palette-created");
    const allLabels = document.querySelectorAll(".hsl-value");

    for (let i = 0; i < allSwatches.length; i++) {
        const currentColor = getComputedStyle(allSwatches[i]).backgroundColor; // always returns rgb(...)
        const converted = mode === "hex"
            ? rgbStringToHex(currentColor)
            : rgbStringToHsl(currentColor);

        allLabels[i].textContent = converted;
        // swatch background stays visually identical since it's the same color, just reformatted
    }
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

            const randomColor = obtenerColorActual();
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

// SET GRID SIZE — swaps the .grid-6 / .grid-8 / .grid-9 
function setGridSize(size) {
    paletteGrid.classList.remove("grid-6", "grid-8", "grid-9");
    paletteGrid.classList.add(`grid-${size}`);
}

// SET UP CLONE AMOUNTS
function setupCloneButton(button, maxClones, gridSize) {
    button.addEventListener("click", function () {
        setGridSize(gridSize);
        reconcileClones(maxClones);
    });
}

setupCloneButton(buttonSix, 5, 6);
setupCloneButton(buttonEight, 7, 8);
setupCloneButton(buttonNine, 8, 9);

// INITIAL LOAD WITH RANDOM CLONES
document.addEventListener("DOMContentLoaded", function () {
    setGridSize(6);
    reconcileClones(5);
    recolorAllPalettes();
});

// TOAST APPEARS ON CLICK
function showToast(targetEl) {
    if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        toast.style.left = `${rect.left + rect.width / 2}px`;
        toast.style.top = `${rect.top + rect.height / 2}px`;
    }
    toast.classList.remove("show");
    void toast.offsetWidth; // force reflow so the animation restarts on rapid clicks
    toast.classList.add("show");
}

// COPY HEX CODE ON CLICK

document.addEventListener("click", function (event) {
    const swatch = event.target.closest(".palette-created");
    if (!swatch) return;

    // find the label that belongs to this swatch
    const container = swatch.closest("#palette-code, .palette-clone");
    const label = container ? container.querySelector(".hsl-value") : null;
    if (!label) return;

    const colorText = rgbStringToHex(getComputedStyle(swatch).backgroundColor);

    navigator.clipboard.writeText(colorText)
        .then(function () {
            console.log("Copied:", colorText);
        })
        .catch(function (err) {
            console.error("Copy failed:", err);
        });

    showToast(swatch);
});

document.getElementById('amount-of-colors-6').classList.add('active');

const sizeButtons = document.querySelectorAll('#button-amount-of-colors button');

sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // remove the style from all buttons
        sizeButtons.forEach(b => b.classList.remove('active'));
        // apply it to the clicked one
        btn.classList.add('active');
    });
});