const numeroRBG = document.getElementById("generate");

const count = document.getElementsByClassName("palette-created");
const hslValue = document.getElementsByClassName("hsl-value");

const buttonSix = document.getElementById("amount-of-colors-6");
const buttonEight = document.getElementById("amount-of-colors-8");
const buttonNine = document.getElementById("amount-of-colors-9");
const paletteContainer = document.getElementById("palette-code");

function obtenerRGB(r, g, b) {
       const red = Math.floor(Math.random() * 256);
       const green = Math.floor(Math.random() * 256);
       const blue = Math.floor(Math.random() * 256);

       return `rgb(${red}, ${green}, ${blue})`;
}

numeroRBG.addEventListener("click", function (event) {
       console.log("target:", event.target);
       console.log("currentTarget:", event.currentTarget);

       for (let i = 0; i < count.length; i++) {

              const nuevoColor = obtenerRGB();

              count[i].style.backgroundColor = nuevoColor;
              RGBvalue[i].textContent = nuevoColor;
       }
});
*/