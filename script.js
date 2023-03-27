
let equationState = 1;
let firstNum = "";
let operator = "";
let secondNum = "";

const display = document.getElementById('display');
const numberButton = document.querySelectorAll('.n-btn');
const operatorButton = document.querySelectorAll('.o-btn');

numberButton.forEach((button) => {
    button.addEventListener('click', () => inputNumber(button.textContent));
})

operatorButton.forEach((button) => {
    button.addEventListener('click', () => selectOperator(button.textContent));
})

function updateDisplay() {
    display.textContent = firstNum + operator + secondNum;
}

function inputNumber(number) {
    if (equationState >= 2) {
        equationState = 3;
        if (secondNum == 0 && number == 0) secondNum = 0;
        else if (secondNum == 0) secondNum = number;
        else secondNum += number;
    } else {
        if (firstNum == 0 && number == 0) firstNum = 0;
        else if (firstNum == 0) firstNum = number;
        else firstNum += number;
    }
    updateDisplay();
}

function selectOperator(o) {
    equationState = 2;
    operator = o;
    updateDisplay();
}
