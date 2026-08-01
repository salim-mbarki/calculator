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

function handleDecimal(number) {
    decimalButton.disabled = true;
    if (!number) {
        return '0.';
    }
    return '.';
}

function clearCalculator() {
    leftNumber = '';
    rightNumber = '';
    operator = null;
    result = 0;
    display.textContent = 0;
    decimalButton.disabled = false;
}

function deleteLastDigit() {
    if (leftNumber && !operator) {
        leftNumber = leftNumber.slice(0, -1);
        display.textContent = formatNumber(+leftNumber);
    } else if (rightNumber) {
        rightNumber = leftNumber.slice(0, -1);
        display.textContent = formatNumber(+rightNumber);
    }
}

function handleOperator(value) {
    if (rightNumber) {
        leftNumber = (operate(+leftNumber, +rightNumber, operator));
        rightNumber = '';
        display.textContent = formatNumber(+leftNumber);
    }
    operator = value;
    if (decimalButton.disabled) {
        decimalButton.disabled = false;
    }
}

function calculate() {
    result = (operate(+leftNumber, +rightNumber, operator));
    leftNumber = result;
    rightNumber = '';
    display.textContent = formatNumber(result);
    if (decimalButton.disabled) {
        decimalButton.disabled = false;
    }
}

function handleNumber(value) {
    if (result) {
        clearCalculator();
    }

    if (operator) {
        if (value === '.') {
            value = handleDecimal(rightNumber);
        }
        rightNumber += value;
        display.textContent = formatNumber(+rightNumber);
    } else {
        if (value === '.') {
            value = handleDecimal(leftNumber);
        }
        leftNumber += value;
        display.textContent = formatNumber(+leftNumber);
    }
}

let leftNumber = '';
let rightNumber = '';
let operator;
let result;

const buttons = Array.from(document.querySelectorAll('button'));
const display = document.querySelector('.display');
const decimalButton = document.querySelector('.decimal-button');

buttons.forEach(button => {
    button.addEventListener('click', handleClick);
})

function handleClick(e) {
    const value = e.target.textContent;

    if (value === '=' && (!leftNumber || !operator || !rightNumber)) {
        return;
    } else if (value === 'CE') {
        clearCalculator();
    } else if (value === 'Del') {
        deleteLastDigit();
    } else if (['+', '-', '*', '/'].includes(value)) {
        handleOperator(value);
    } else if (value === '=') {
        calculate();
    } else {
        handleNumber(value);
    }
}