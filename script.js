const inputBill = document.getElementById("input-bill");
const selectsTip = document.querySelectorAll("#select-tip");
const customTip = document.getElementById("custom-tip");
const tipMsg = document.querySelector(".tip-msg");
const numberPeople = document.getElementById("number-of-people");
const peopleMsg = document.querySelector(".people-msg");
const resultTip = document.querySelector(".result-tip");
const resultTotal = document.querySelector(".result-total");
const buttonReset = document.getElementById("reset");

let bill = 0;
let discount;
let people = 1;

let amount = 0;
let total = 0;

let USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function updateResultDisplay() {}

inputBill.addEventListener("input", () => {
  let rawValue = inputBill.value;
  let cleanedValue = rawValue.replace(/[^0-9.]/g, "");
  inputBill.value = cleanedValue;
});

selectsTip.forEach((selectTip) => {
  selectTip.addEventListener("click", () => {
    selectsTip.forEach((select) => select.classList.remove("selected"));

    selectTip.classList.add("selected");
    discount = selectTip.value;
  });
});

customTip.addEventListener("input", () => {
  let rawValue = customTip.value;
  let cleanedValue = rawValue.replace(/[^0-9]/g, "");
  customTip.value = cleanedValue;

  if (customTip.closest(".input-wrapper.selected")) {
    discount = cleanedValue;
  }
});

numberPeople.addEventListener("input", () => {
  let rawValue = numberPeople.value;
  let cleanedValue = rawValue.replace(/[^0-9]/g, "");
  numberPeople.value = cleanedValue;

  if (cleanedValue === "0" || cleanedValue === "") {
    numberPeople.closest(".input-wrapper").classList.add("error");
    peopleMsg.style.display = "block";
  } else {
    numberPeople.closest(".input-wrapper").classList.remove("error");
    peopleMsg.style.display = "none";
  }
});
