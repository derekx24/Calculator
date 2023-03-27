
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
    if (equationState == 1) {
        firstNum += number;
    } else {
        secondNum += number;
    }
    updateDisplay();
}

function selectOperator(o) {
    equationState = 2;
    operator = o;
    updateDisplay();
}
