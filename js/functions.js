const buttons = document.querySelectorAll("button.next");
const steps = Array.from(document.querySelectorAll("div.step"));
const form = document.getElementById("contact-form");
console.log("🚀 ~ file: functions.js ~ line 4 ~ form", form);
let currentStep = 0;

/*
- Detectar el click en los 2 botones de next
- Agarrar los 3 forms
- Cada vez que hago click en next, escondo el step-currentStep, 
luego incremento currentStep y muestro el step-currentStep incrementado 
*/

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    form.reportValidity();

    steps[currentStep].classList.remove("active");
    currentStep++;
    steps[currentStep].classList.add("active");
  });
});
