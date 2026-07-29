function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    let result;
    switch (operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = substract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
    }
    return result;
}

function formatNumber(number) {
    return Number(number.toFixed(6))
}

let leftNumber = '';
let rightNumber = '';
let operator;
let result;

const buttons = Array.from(document.querySelectorAll('button'));
const display = document.querySelector('.display');

buttons.forEach(button => {
    button.addEventListener('click', handleClick);
})

function handleClick(e) {
    const value = e.target.textContent;

    if (value === '=' && (!leftNumber || !operator || !rightNumber)) {
        return;
    } else if (value === 'CE') {
        clearCalculator();
    } else if (['+', '-', '*', '/'].includes(value)) {
        handleOperator(value);
    } else if (value === '=') {
        calculate();
    } else {
        handleNumber(value);
    }
}

function clearCalculator() {
    leftNumber = '';
    rightNumber = '';
    operator = null;
    result = 0;
    display.textContent = 0;
}

function handleOperator(value) {
    if (rightNumber) {
        leftNumber = (operate(+leftNumber, +rightNumber, operator));
        rightNumber = '';
        display.textContent = formatNumber(+leftNumber);
    }
    operator = value;
}

function calculate() {
    result = (operate(+leftNumber, +rightNumber, operator));
    leftNumber = result;
    rightNumber = '';
    display.textContent = formatNumber(result);
}

function handleNumber(value) {
    if (result) {
        clearCalculator();
    }
    if (operator) {
        rightNumber += value;
        display.textContent = formatNumber(+rightNumber);
    } else {
        leftNumber += value;
        display.textContent = formatNumber(+leftNumber);
    }
}