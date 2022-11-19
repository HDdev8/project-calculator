calculator = document.querySelector(".calculator");

displaySector = document.querySelector(".display-sector");
display = document.querySelector(".display");
display.textContent = " ";
displaySector.appendChild(display);

addButton = document.querySelector("#add");
addButton.addEventListener("click", (e) => {});

subButton = document.querySelector("#subtract");
multiButton = document.querySelector("#multiply");
divButton = document.querySelector("#divide");

one = document.querySelector("#one");
one.addEventListener("click", (e) => {
  console.log(e);
});

two = document.querySelector("#two");
two.addEventListener("click", (e) => {
  console.log(e.target);
});

three = document.querySelector("#three");
four = document.querySelector("#four");
five = document.querySelector("#five");
six = document.querySelector("#six");
seven = document.querySelector("#seven");
eight = document.querySelector("#eight");
nine = document.querySelector("#nine");
zero = document.querySelector("#zero");

const add = function (a, b) {
  result = a + b;
  return result;
};

const subtract = function (a, b) {
  result = a - b;
  return result;
};
// alternative add?
/* const add = function (...args) {
  let result = 0;
  for (let arg of args) {
    result += arg;
  }
  return result;
}; */
// alternative subtract?
/* const subtract = function (...args) {
  let result = 0;
  for (let arg of args) {
    result -= arg;
  }
  return result;
}; */

const sum = function (array) {
  let total = 0;
  for (let element of array) {
    total += element;
  }
  return total;
};

const multiply = function (...args) {
  let total = 1;
  let newArray = args.join().split(",");
  for (let element of newArray) {
    total *= element;
  }
  return total;
};

const power = function (a, b) {
  let result = 1;
  let counter = 0;
  while (counter < b) {
    result = result * a;
    counter = counter + 1;
  }
  return result;
};

const factorial = function (a) {
  if (a == 0) {
    return 1;
  } else {
    return factorial(a - 1) * a;
  }
};

const operate = function () {};

/* calculator.add(0, 0);
calculator.subtract(10, 4);
calculator.sum([]);
calculator.multiply([2, 4]);
calculator.power(4, 3);
calculator.factorial(0); */
