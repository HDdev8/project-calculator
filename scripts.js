const calculator = document.querySelector(".calculator");
const displaySector = document.querySelector(".display-sector");
const display = document.querySelector(".display");

const newDisplay = document.createElement("div");
newDisplay.classList.add("new-display");
newDisplay.textContent = "";
displaySector.appendChild(newDisplay);

const errorDisplay = document.createElement("div");
errorDisplay.classList.add("error-display");

const numButtons = document.querySelectorAll(".number-button");
const oppButtons = document.querySelectorAll(".operator-button");
const delButton = document.querySelector(".delete-button");
const clearButton = document.querySelector(".clear-button");
const equalsButton = document.querySelector(".equals-button");

let numArray = [];
let oppArray = [];
let allArray = [];
let newAllArray = [];
let numArrayValue;
let priorOppValue;
let oppIndex;
let firstVar;
let secondVar;
let joinFirst;
let joinSecond;
let calcArray = [];
let allArrayJoined;
let addedTotal;
let subtractedTotal;
let multipliedRounded;
let dividedRounded;
let divString;
let divStringLength;
let multiString;
let multiStringLength;
let displayLength;
//
const removeDisplay = function () {
  display.remove();
  displaySector.appendChild(newDisplay);
};
const removeNewDisplay = function () {
  newDisplay.remove();
  newDisplay.textContent = "";
  errorDisplay.remove();
  errorDisplay.textContent = "";
  displaySector.appendChild(display);
  displaySector.appendChild(newDisplay);
};
const clearAll = function () {
  display.remove();
  display.textContent = 0;
  newDisplay.remove();
  newDisplay.textContent = "";
  errorDisplay.remove();
  errorDisplay.textContent = "";
  displaySector.appendChild(display);
  displaySector.appendChild(newDisplay);
  numArray = [];
  oppArray = [];
  allArray = [];
  newAllArray = [];
  numArrayValue;
  priorOppValue;
  oppIndex;
  firstVar;
  secondVar;
  joinFirst;
  joinSecond;
  calcArray = [];
};

const mediaQuery = window.matchMedia("(max-width: 30rem)");

const excessError = function () {
  if (mediaQuery.matches) {
    if (newDisplay.textContent.length > 7) {
      newDisplay.remove();
      errorDisplay.textContent = "ERR";
      displaySector.appendChild(errorDisplay);
    }
  }
  if (!mediaQuery.matches) {
    if (newDisplay.textContent.length > 11) {
      newDisplay.remove();
      errorDisplay.textContent = "ERR";
      displaySector.appendChild(errorDisplay);
    }
  }
};

//
const round = function (value, precision) {
  let multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

// this adds every number button entry into the numArray
const clickNumberButtons = function (e) {
  if (e.target.dataset.key === `${e.target.dataset.key}`) {
    removeDisplay();
    newDisplay.textContent += `${e.target.dataset.key}`;
    numArray.push(`${e.target.dataset.key}`);
    excessError();
  }
};
numButtons.forEach((numButton) => numButton.addEventListener("click", clickNumberButtons));

const operate = function (e) {
  removeDisplay();
  display.textContent = clickNumberButtons(e);
  removeNewDisplay();
  //I havent figured out how to keep the first operand on the display before the new numbers are entered
  //
  if (e.target.id === `${e.target.id}`) {
    oppArray.push(`${e.target.textContent}`);
    if (oppArray.length > 1) {
      priorOppValue = oppArray[oppArray.length - 2];
      if (priorOppValue === "+") {
        oppIndex = allArray.indexOf("+");
        firstVar = allArray.slice(0, oppIndex);
        secondVar = allArray.slice(oppIndex + 1, allArray.length);
        joinFirst = firstVar.join("");
        joinSecond = secondVar.join("");
        calcArray.push(Number(joinFirst));
        calcArray.push(Number(joinSecond));
        addedTotal = calcArray.reduce((total, number) => {
          return Number(total) + Number(number);
        }, Number(0));
        removeNewDisplay();
        display.textContent = addedTotal;
        allArray = [addedTotal];
        calcArray = [];
      }
      if (priorOppValue === "–") {
        oppIndex = allArray.indexOf("–");
        firstVar = allArray.slice(0, oppIndex);
        secondVar = allArray.slice(oppIndex + 1, allArray.length);
        joinFirst = firstVar.join("");
        joinSecond = secondVar.join("");
        calcArray.push(Number(joinFirst));
        calcArray.push(Number(joinSecond));
        subtractedTotal = calcArray.reduce((total, number) => {
          return Number(total) - Number(number);
        });
        removeNewDisplay();
        display.textContent = subtractedTotal;
        allArray = [subtractedTotal];
        calcArray = [];
      }
      if (priorOppValue === "÷") {
        oppIndex = allArray.indexOf("÷");
        firstVar = allArray.slice(0, oppIndex);
        secondVar = allArray.slice(oppIndex + 1, allArray.length);
        joinFirst = firstVar.join("");
        joinSecond = secondVar.join("");
        if (joinSecond === "0") {
          display.textContent = "No!";
        } else if (joinSecond !== "0") {
          calcArray.push(Number(joinFirst));
          calcArray.push(Number(joinSecond));
          dividedTotal = calcArray.reduce((total, number) => {
            return Number(total) / Number(number);
          });
          let dividedRounded = round(dividedTotal, 9);
          removeNewDisplay();
          //display.textContent = dividedRounded;
          divString = dividedRounded.toString();
          divStringLength = divString.length;
          if (divStringLength > 11) {
            display.textContent = dividedRounded.toPrecision(6);
          } else display.textContent = dividedRounded;
          allArray = [dividedRounded];
          calcArray = [];
        }
      }
      if (priorOppValue === "×") {
        oppIndex = allArray.indexOf("×");
        firstVar = allArray.slice(0, oppIndex);
        secondVar = allArray.slice(oppIndex + 1, allArray.length);
        joinFirst = firstVar.join("");
        joinSecond = secondVar.join("");
        calcArray.push(Number(joinFirst));
        calcArray.push(Number(joinSecond));
        multipliedTotal = calcArray.reduce((total, number) => {
          return Number(total) * Number(number);
        });
        let multipliedRounded = round(multipliedTotal, 9);
        removeNewDisplay();
        //display.textContent = multipliedRounded;
        multiString = multipliedRounded.toString();
        multiStringLength = multiString.length;
        if (multiStringLength > 11) {
          display.textContent = multipliedRounded.toPrecision(6);
        } else display.textContent = multipliedRounded;
        allArray = [multipliedRounded];
        calcArray = [];
      }
      if (priorOppValue === "=") {
        oppArray = [`${e.target.textContent}`];
        allArray = [allArray[0]];
        calcArray = [];
      }
    }
  }
};
oppButtons.forEach((oppButton) => oppButton.addEventListener("click", operate));
equalsButton.addEventListener("click", operate);

//this adds everything to allArray
const addToAllArray = function (e) {
  if (e.target.id === `${e.target.id}`) {
    allArray.push(`${e.target.textContent}`);
  }
};
oppButtons.forEach((oppButton) => oppButton.addEventListener("click", addToAllArray));
numButtons.forEach((numButton) => numButton.addEventListener("click", addToAllArray));

clearButton.addEventListener("click", (e) => {
  clearAll(e);
});
const deleteOneNumber = function () {
  displayLength = newDisplay.textContent.length;
  if (displayLength > 1) {
    newDisplay.textContent = newDisplay.textContent.slice(0, displayLength - 1);
    numArray.pop();
    allArray.pop();
  }
};
delButton.addEventListener("click", (e) => {
  deleteOneNumber(e);
});
//
//
