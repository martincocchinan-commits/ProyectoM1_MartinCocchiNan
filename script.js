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

// HSL ON START AND CLICK
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

// 6
function setupCloneButton(button, maxClones) {
    let added = false;
    button.addEventListener("click", function () {

        document.querySelectorAll(".palette-clone").forEach(el => el.remove());

        for (let i = 0; i < maxClones; i++) {

            const clone = paletteContainer.cloneNode(true);
            clone.removeAttribute("id");
            clone.classList.add("palette-clone");

            paletteContainer.parentNode.appendChild(clone);

        }

        added = true;
    });
}



// 8 DINAMICO
function setupCloneButton(buttonEight, maxClones) {
    buttonEight.addEventListener("click", function () {
        reconcileClones(maxClones);
    });
}

function reconcileClones(maxClones) {
    const existingClones = Array.from(document.querySelectorAll(".palette-clone"));
    const currentCount = existingClones.length;

    if (maxClones > currentCount) {
        // need more clones — add only the difference, each with a fresh random color
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
        // too many — remove only the extras, leave the rest exactly as they are
        for (let i = currentCount - 1; i >= maxClones; i--) {
            existingClones[i].remove();
        }
    }
    // if maxClones === currentCount, nothing changes at all
}


// 9
function setupCloneButton(buttonNine, maxClones) {
    let added = false;
    buttonNine.addEventListener("click", function () {

        document.querySelectorAll(".palette-clone").forEach(el => el.remove());

        for (let i = 0; i < maxClones; i++) {

            const clone = paletteContainer.cloneNode(true);
            clone.removeAttribute("id");
            clone.classList.add("palette-clone");

            paletteContainer.parentNode.appendChild(clone);

        }

        added = true; // lock it so it won't run again
    });
}

setupCloneButton(buttonSix, 5);
setupCloneButton(buttonEight, 7);
setupCloneButton(buttonNine, 8);

// HSL ON CLICK
function obtenerHsl() {
       const hue = Math.floor(Math.random() * 360);
       const saturation = Math.floor(Math.random() * 100);
       const light = Math.floor(Math.random() * 100);

       return `hsl(${hue}, ${saturation}%, ${light}%)`;
}

numeroRBG.addEventListener("click", function (event) {
       console.log("target:", event.target);
       console.log("currentTarget:", event.currentTarget);

       for (let i = 0; i < count.length; i++) {

              const newColor = obtenerHsl();

              count[i].style.backgroundColor = newColor;
              hslValue[i].textContent = newColor;
       }
});

console.log(numeroRBG);
console.log(count);
console.log(RGBvalue);
console.log(paletteContainer);
console.log(palettes);