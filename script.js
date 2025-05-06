// Element selectors
const billInput = document.getElementById("input-bill");
const tipButtons = document.querySelectorAll(".select-tip"); // Changed from ID to class
const customTipInput = document.getElementById("custom-tip");
const tipErrorMsg = document.querySelector(".tip-msg");
const peopleInput = document.getElementById("number-of-people");
const peopleErrorMsg = document.querySelector(".people-msg");
const tipResultDisplay = document.querySelector(".result-tip");
const totalResultDisplay = document.querySelector(".result-total");
const resetButton = document.getElementById("reset");

// App state
let billAmount = 0;
let tipRate = 0;
let numberOfPeople = 1;

// Currency formatter
const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// Format to 2 decimal places (floor)
function formatFloorTwoDecimals(num) {
  return Math.floor(num * 100) / 100;
}

// Format to 2 decimal places (ceil)
function formatCeilTwoDecimals(num) {
  return Math.ceil(num * 100) / 100;
}

// Update the tip and total per person display
function updateResults() {
  if (!billAmount || !numberOfPeople || !tipRate) {
    tipResultDisplay.textContent = "$0.00";
    totalResultDisplay.textContent = "$0.00";
    return;
  }

  const tipPerPerson = (billAmount / numberOfPeople) * tipRate;
  const totalPerPerson = billAmount / numberOfPeople + tipPerPerson;

  tipResultDisplay.textContent = usdFormatter.format(
    formatFloorTwoDecimals(tipPerPerson)
  );
  totalResultDisplay.textContent = usdFormatter.format(
    formatCeilTwoDecimals(totalPerPerson)
  );
}

// Handle bill input
billInput.addEventListener("input", () => {
  const sanitizedValue = billInput.value.replace(/[^0-9.]/g, "");
  billInput.value = sanitizedValue;
  billAmount = Number(sanitizedValue);

  updateResults();
});

// Handle predefined tip button selection
tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Deselect all buttons
    tipButtons.forEach((btn) => btn.classList.remove("selected"));

    // Select the clicked button
    button.classList.add("selected");

    // Clear custom tip input
    customTipInput.value = "";

    tipRate = Number(button.value) / 100;

    updateResults();
  });
});

// Handle custom tip input
customTipInput.addEventListener("input", () => {
  // Remove non-numeric characters
  let sanitizedValue = customTipInput.value.replace(/[^0-9]/g, "");

  // Convert to number and clamp between 0 and 100
  let tipValue = Math.min(Math.max(Number(sanitizedValue), 0), 100);

  // Update input field and tip rate
  customTipInput.value = tipValue;

  // Unselect all predefined tip buttons
  tipButtons.forEach((btn) => btn.classList.remove("selected"));

  tipRate = Number(sanitizedValue) / 100;

  updateResults();
});

// Handle number of people input
peopleInput.addEventListener("input", () => {
  const sanitizedValue = peopleInput.value.replace(/[^0-9]/g, "");
  peopleInput.value = sanitizedValue;

  if (sanitizedValue === "0" || sanitizedValue === "") {
    peopleInput.closest(".input-wrapper").classList.add("error");
    peopleErrorMsg.style.display = "block";
    numberOfPeople = 0;
  } else {
    peopleInput.closest(".input-wrapper").classList.remove("error");
    peopleErrorMsg.style.display = "none";
    numberOfPeople = Number(sanitizedValue);
  }

  updateResults();
});

// Handle reset button click
resetButton.addEventListener("click", () => {
  // Reset state
  billAmount = 0;
  tipRate = 0;
  numberOfPeople = 1;

  // Reset inputs
  billInput.value = "";
  customTipInput.value = "";
  peopleInput.value = "";

  // Reset UI
  tipButtons.forEach((btn) => btn.classList.remove("selected"));
  peopleInput.closest(".input-wrapper").classList.remove("error");
  peopleErrorMsg.style.display = "none";

  updateResults();
});
