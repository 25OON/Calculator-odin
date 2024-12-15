//select
const operatorButton = document.querySelectorAll("#btnOp");
const numberButton = document.querySelectorAll("#btnNum");
const equalButton = document.querySelector("#btnEqual");
const clearButton = document.querySelector("#btnClear");
const deleteButton = document.querySelector("#btnDelete");
//
const displayCurrent = document.querySelector(".current");
const displayPrevious = document.querySelector(".previous");

let isSum = false;
let current = "";
let previous = "";
let operator = "";

function updateDisplay(){
    displayCurrent.textContent = current;
    displayPrevious.textContent = previous + operator;
}

function ClearAll(){
    current = "";
    previous = "";
    operator = "";
    updateDisplay();
}

function deleteOne(){
    current = current.substring(0, current.length - 1);
    updateDisplay();
}

function operate(num1, operator, num2) {
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);
    switch(operator) {
      case "+":
        return number1 + number2;
      case "*":
        return number1 * number2;
      case "/":
        return number1 / number2;
      case "-": 
        return number1 - number2;
      case "^":
        return number1 ** number2;
    }
  }

function addNumber(number){
    if(isSum){
        ClearAll();
        isSum = false;
    }
    if (!(number == "." && !current || number == "." && current.includes("."))) {
        current += number;
        updateDisplay();
      } 
}
function addOperator(opt){
    if(isSum) {
        isSum = false;
      }
    if(previous) {
        current = operate(previous, operator, current);
        operator = "";
      }
    if(current) {
      operator = opt;
      previous = current;
      current = "";
      updateDisplay();
    }
}

numberButton.forEach(button => {
    button.addEventListener("click", () => addNumber(button.textContent))
  });
  
operatorButton.forEach(button => {
  button.addEventListener("click", () => addOperator(button.textContent))
})

equalButton.addEventListener("click", () => {
    if (previous && operator && current) {
      current = operate(previous, operator, current);
      previous = "";
      operator = "";
      isSum = true;
      updateDisplay();
    }
  }); 
deleteButton.addEventListener("click", deleteOne);

clearButton.addEventListener("click", ClearAll);