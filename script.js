let equationState = 1;
let firstNum = '';
let operator = '';
let secondNum = '';
let result = '';

const display = document.getElementById('display');
const previous = document.getElementById('previous');
const ansButton = document.querySelector('.ans-btn');
const acButton = document.querySelector('.ac-btn');
const delButton = document.querySelector('.del-btn');
const numberButton = document.querySelectorAll('.n-btn');
const operatorButton = document.querySelectorAll('.o-btn');
const decimalButton = document.querySelector('.d-btn');
const equalsButton = document.querySelector('.e-btn');

ansButton.onclick = () => inputPreviousAns();
acButton.onclick = () => clearScreen();
delButton.onclick = () => deletePrevious();

numberButton.forEach((button) => {
    button.addEventListener('click', () => inputNumber(button.textContent));
})

operatorButton.forEach((button) => {
    button.addEventListener('click', () => selectOperator(button.textContent));
})

decimalButton.onclick = () => addDecimal();
equalsButton.onclick = () => performOperation();
window.addEventListener('keydown', handleKey);

function updateDisplay() {
    display.textContent = firstNum + operator + secondNum;
}

function inputPreviousAns() {
    if (result === '') return;
    if (equationState === 1) {
        firstNum += result;
    } else {
        equationState = 3;
        secondNum += result;
    }
    updateDisplay();
}

function clearScreen() {
    reset();
    if (result != '') previous.textContent = `Ans = ${result}`;
    updateDisplay();
    display.textContent = '0';
}

function deletePrevious() {
    if (result != '') previous.textContent = `Ans = ${result}`;
    if (equationState == 1) {
        firstNum = firstNum.toString().slice(0, -1);
    } else if (equationState === 2 || ((equationState === 3) && (secondNum === ''))) {
        operator = '';
        equationState = 1;
    } else {
        secondNum = secondNum.toString().slice(0, -1);
    }
    updateDisplay();
}

function inputNumber(number) {
    if (result != '') previous.textContent = `Ans = ${result}`;
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
    if (equationState === 3) return;
    if (result != '') previous.textContent = `Ans = ${result}`;
    if (firstNum === '' && result != '') {
        firstNum = result;
    } else if (firstNum === '') firstNum = '0';

    equationState = 2;
    operator = o;
    updateDisplay();
}

function addDecimal() {
    if (equationState === 1) {
        if (firstNum === '') firstNum = '0.';
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
    firstNum = '';
    operator = '';
    secondNum = '';
}

function performOperation() {
    if (secondNum === '') return;
    result = round(calculate());
    previous.textContent = firstNum + operator + secondNum + '=';
    display.textContent = result;
    reset();
}

function handleKey(e) {
    if (e.key === 'a') inputPreviousAns();
    if (e.key === 'Backspace') deletePrevious();
    if (e.key >= 0 && e.key <= 9) inputNumber(e.key);
    if (e.key === '.') addDecimal();
    if (e.key === '=') performOperation();
    if (e.key === '+') selectOperator('+');
    if (e.key === '-') selectOperator('−');
    if (e.key === '*') selectOperator('×');
    if (e.key === '/') selectOperator('÷');
  }