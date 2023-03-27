
let equationState = 1;
let firstNum = "";
let operator = "";
let secondNum = "";
let result = "";

const display = document.getElementById('display');
const numberButton = document.querySelectorAll('.n-btn');
const operatorButton = document.querySelectorAll('.o-btn');
const decimalButton = document.querySelector('.d-btn');
const equalsButton = document.querySelector('.e-btn');

numberButton.forEach((button) => {
    button.addEventListener('click', () => inputNumber(button.textContent));
})

operatorButton.forEach((button) => {
    button.addEventListener('click', () => selectOperator(button.textContent));
})

decimalButton.onclick = () => addDecimal();
equalsButton.onclick = () => performOperation();

function updateDisplay() {
    display.textContent = firstNum + operator + secondNum;
}

function inputNumber(number) {
    if (equationState >= 2) {
        equationState = 3;
        if (secondNum === 0 && number === 0) secondNum = 0;
        else if (secondNum === 0) secondNum = number;
        else secondNum += number;
    } else {
        if (firstNum === 0 && number === 0) firstNum = 0;
        else if (firstNum === 0) firstNum = number;
        else firstNum += number;
    }
    updateDisplay();
}

function selectOperator(o) {
    equationState = 2;
    operator = o;
    updateDisplay();
}

function addDecimal() {
    if (equationState === 1) {
        if (firstNum === 0) firstNum = '0.';
        if (!firstNum.includes('.')) firstNum += '.';
    } else if (equationState === 2) {
        equationState = 3;
        secondNum = '0.';
    } else {
        if (secondNum === '') secondNum = '0.';
        if (!secondNum.includes('.')) secondNum += '.';
    }
    updateDisplay();
}

function calculate() {
    let a = Number(firstNum);
    let b = Number(secondNum);
    switch (operator) {
        case '+':
            return a + b;
        case '−':
          return a - b;
        case '×':
          return a * b;
        case '÷':
          if (secondNum === 0) return 'error';
          return a / b;
        default:
          return firstNum;
      }
}

function round(n) {
    return (Math.round(n * 1000000) / 1000000);
}

function reset() {
    equationState = 1;
    firstNum = "";
    operator = "";
    secondNum = "";
}

function performOperation() {
    result = round(calculate());
    display.textContent = result;
    reset();
}